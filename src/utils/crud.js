const User = require('../resources/user/user.model')
const createOrder =
  (model) => async (req, res, next) => {
    try {
      // Uncomment this piece of codes if you want to use basic authntication
      //   const authenticatedUser =
      //     req.authenticatedUser
      //   if (!authenticatedUser) {
      //     return res
      //       .status(403)
      //       .send({
      //         message: 'forbidden'
      //       })
      //   }
      const authenticatedUser = req.user
      const body = req.body
      const user = await User.findById(
        authenticatedUser.id
      )

      const order = await model.create({
        items: body.items,
        user: user.id
      })

      user.orders = user.orders.concat(
        order.id
      )
      await user.save()

      return res
        .status(201)
        .json({ data: order })
    } catch (err) {
      next(err)
    }
  }

const checkOrderById =
  (model) => async (req, res, next) => {
    try {
      const authenticatedUser =
        req.authenticatedUser
      if (!authenticatedUser) {
        return res.status(403).send({
          message: 'forbidden'
        })
      }
      const { id } = req.params
      const order =
        await model.findById(id)

      if (!order) {
        return res.status(404).json({
          status: false,
          order: null
        })
      }

      return res
        .status(200)
        .json({ data: order })
    } catch (err) {
      next(err)
    }
  }

const checkAllOrder =
  (model) => async (req, res, next) => {
    try {
      //   const authenticatedUser =
      //     req.authenticatedUser
      //   if (!authenticatedUser) {
      //     // return res.status(403).send({
      //     //   message: 'forbidden'
      //     // })
      // 	return next()
      //   }

      //Comment the next 2 lines for basic authentication
      const authenticatedUser = req.user
      const usersOrder = User.findOne({
        _id: authenticatedUser.id
      })
        .populate('orders')
        .select('orders')
      // console.log(usersOrder.schema.obj)

      let orders

      const { price, date, p } =
        req.query

      // pagination
      const page = p || 1
      const ordersPerPage = 2

      // uncomment for basic authentication
      //   const orderCount =
      //     await model.countDocuments()
      // compared with skipPage for basic auth
      const skipPage =
        (page - 1) * ordersPerPage

      // pagination for jwt authentication
      const paginate = (
        array,
        page_size,
        page_number
      ) => {
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        )
      }

      //sort by price or date
      if (price) {
        const value =
          price === 'asc'
            ? 1
            : price === 'desc'
            ? -1
            : false
        if (value) {
          orders = await usersOrder // replace this with model.find({}) for basic authentication
          //   .sort({ total_price: value }) // uncomment for basic authentication
          //     .skip(skipPage)
          //     .limit(ordersPerPage)
          const sortedOrder =
            orders.orders.sort(
              (a, b) => {
                if (value === 1) {
                  return (
                    a.total_price -
                    b.total_price
                  )
                } else if (
                  value === -1
                ) {
                  return (
                    b.total_price -
                    a.total_price
                  )
                }
              }
            )

          const paginatedOrder =
            paginate(
              sortedOrder,
              ordersPerPage,
              page
            )
          console.log(
            orders.orders.length
          )
          if (
            skipPage <
            orders.orders.length
          )
            return res
              .status(200)
              .json({
                data: paginatedOrder
              })
        }
        next()
      } else if (date) {
        const value =
          date === 'asc'
            ? 1
            : date === 'desc'
            ? -1
            : false

        if (value) {
          orders = await usersOrder
          // .sort({ created_at: value })
          // .skip(skipPage)
          // .limit(orderssPerPage)

          const sortedOrder =
            orders.orders.sort(
              (a, b) => {
                if (value === 1) {
                  return (
                    a.created_at -
                    b.created_at
                  )
                } else if (
                  value === -1
                ) {
                  return (
                    b.created_at -
                    a.created_at
                  )
                }
              }
            )

          const paginatedOrder =
            paginate(
              sortedOrder,
              ordersPerPage,
              page
            )
          if (
            skipPage <
            orders.orders.length
          )
            return res
              .status(200)
              .json({
                data: paginatedOrder
              })
        }
        next()
      }

      if (!orders) {
        orders = await usersOrder
        const paginatedOrder = paginate(
          orders.orders,
          ordersPerPage,
          page
        )
        if (
          skipPage <
          orders.orders.length
        )
          return res
            .status(200)
            .json({ data: orders })
        // .skip(skipPage) // for basic authentication
        // .limit(booksPerPage)
      }
      next()

      // console.log('line 65 ->', price)
      // if (price || date) {
      //     console.log('line 67 ->', price)
      //     try{
      //         orders = model.find({}).sortOrder(price || date)
      //         return res.status(200).json({ data: orders })
      //     } catch (err) {
      //         console.log(err)
      //     }

      // return res.status(200).json({ data: newOrder })
      // }
      // if (!orders){
      //     return res
      // 	.status(200)
      // 	.json({ data: orders })
      // }
    } catch (err) {
      next(err)
      //   return res.status(404)
    }
  }

const orderState =
  (model) => async (req, res, next) => {
    try {
      const authenticatedUser =
        req.authenticatedUser
      if (!authenticatedUser) {
        return res.status(403).send({
          message: 'forbidden'
        })
      }
      const { id } = req.params
      const { state } = req.body

      const order =
        await model.findById(id)

      if (!order) {
        return res.status(404).json({
          status: false,
          order: null
        })
      }

      if (state < order.state) {
        return res.status(422).json({
          status: false,
          order: null,
          message: 'Invalid operation'
        })
      }

      order.state = state

      await order.save()

      return res
        .status(200)
        .json({ data: order })
    } catch (err) {
      next(err)
    }
  }

const deleteOrder =
  (model) => async (req, res, next) => {
    try {
      const authenticatedUser =
        req.authenticatedUser
      if (!authenticatedUser) {
        return res.status(403).send({
          message: 'forbidden'
        })
      }

      if (
        authenticatedUser.role !==
        'admin'
      ) {
        return res.status(401).send({
          message: 'Unauthorised'
        })
      }

      const { id } = req.params

      try {
        await model.deleteOne({
          _id: id
        })
      } catch {
        res.status(401).json({
          message: 'id not found'
        })
      }

      return res.status(204).json({
        message: 'successfully deleted'
      })
    } catch (err) {
      next(err)
    }
  }

const crudControllers = (model) => ({
  createOrder: createOrder(model),
  checkOrderById: checkOrderById(model),
  checkAllOrder: checkAllOrder(model),
  orderState: orderState(model),
  deleteOrder: deleteOrder(model)
})

module.exports = {
  createOrder,
  checkOrderById,
  checkAllOrder,
  orderState,
  deleteOrder,
  crudControllers
}
