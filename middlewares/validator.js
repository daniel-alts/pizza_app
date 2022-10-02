const { compareAgainstSchema } = require("../utils")
const { TYPES } = require("../constants")

const defaultOptions = {
  strict: true, // Must be strict
}

/* A simple shallow comparison function */
const validator = (req, res, next, schema, options = defaultOptions) => {
  const compare = compareAgainstSchema(req.body, schema, 'body')

  if (compare.error) {
    return res.status(400).json({ status: false, ...compare })
  }

  if (options.strict) {
    let _got = { ...req.body }
    Object.keys(schema).forEach((key) => delete _got[key])
    _got = Object.keys(_got)
    if (_got.length > 0) {
      return res.status(400).json({ status: false, error: `unidentified fields ${_got.join(', ')}` })
    }
  }

  next()
}

exports.validateCreateUser = (req, res, next) => validator(req, res, next, {
  password: 'string',
  username: 'string',
  user_type: TYPES
})

exports.validatePostOrder = (req, res, next) => validator(req, res, next, {
  items: [{ price: 'number', name: 'string', size: ['m', 's', 'l'], quantity: 'number' }]
})