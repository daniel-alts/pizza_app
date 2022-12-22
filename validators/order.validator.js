const Joi = require("joi");

const orderValidatorMiddleware = async (req, res, next) => {
  const orderPayload = req.body;
  try {
    await orderValidator.validateAsync(orderPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};

const orderValidator = Joi.object({
  created_at: Joi.date().default(Date.now()),
  state: Joi.string()
    .valid("pending", "confirmed", "delivered", "cancelled")
    .default("pending"),
  total_cost: Joi.number(),
  items: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      price: Joi.number().min(0).required(),
      size: Joi.string().valid("m", "s", "l").required(),
      quantity: Joi.number().required(),
      cost: Joi.number(),
    })
  ),
});

module.exports = orderValidatorMiddleware;
