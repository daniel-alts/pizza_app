const orderModel = require('../model/orderModel');
const User = require('../model/userModel');

module.exports = (function middlewares() {
  return {
    confirmUser: (req, res, next) => {
      (async function confirmUser() {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
          const err = new Error('You must be logged in to access this route.');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
        } else {
          const auth = Buffer.from(authHeader.split(' ')[1], 'base64')
            .toString()
            .split(':');
          const username = auth[0];
          const password = auth[1];

          const foundUser = await User.findOne({ username });

          if (!foundUser || foundUser.password !== password) {
            const err = new Error('Wrong username or password.');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
          } else {
            req.user = foundUser;
            next();
          }
        }
      })();
    },
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
