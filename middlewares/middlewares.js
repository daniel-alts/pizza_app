const orderModel = require('../model/orderModel');

module.exports = (function middlewares() {
  return {
    pagination: (req, res, next) => {
      (async function paginate() {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const order = {};

        if (endIndex < (await orderModel.countDocuments().exec())) {
          order.next = {
            page: page + 1,
            limit,
          };
        }

        if (startIndex > 0) {
          order.previous = {
            page: page - 1,
            limit,
          };
        }

        try {
          let queryBy = {};
          if (req.query.state) {
            queryBy.state = req.query.state;
          }
          order.orders = await orderModel
            .find(queryBy)
            .limit(limit)
            .skip(startIndex);
          req.order = order;
          next();
        } catch (err) {
          return res.status(500).json({ err });
        }
      })();
    },
  };
})();
