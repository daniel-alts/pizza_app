const Joi = require("joi");

const userValidatorMiddleware = async (req, res, next) => {
  const userPayload = req.body;
  try {
    await userValidator.validateAsync(userPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};

const userValidator = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Please tell us your name",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required().min(8),
  passwordConfirm: Joi.ref("password"),
  role: Joi.string().valid("user", "admin").default("user"),
  created_at: Joi.date().default(Date.now()),
});

module.exports = userValidatorMiddleware;
