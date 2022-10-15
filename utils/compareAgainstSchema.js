const isArray = (obj) => typeof obj === "object" && obj.length
const isObjectLiteral = (obj) => Object.getPrototypeOf(obj).constructor === Object

const compareAgainstSchema = (got, schema, alias = 'data') => {
  const expected = Object.entries(schema)

  for (const entry of expected) {
    const [key, compare] = entry;
    if (!got[key]) {
      return { error: `expected ${key} in ${alias}` }
    }
    const gotValue = got[key]
    if (typeof compare === "string") { // expect type
      if (typeof gotValue !== compare) {
        return { error: `expected ${key} to be a ${compare}` }
      }
    } else if (isArray(compare)) {
      let _schema;
      if (compare.length === 1 && isObjectLiteral(_schema = compare[0])) { // expect an array of objects
        if (!isArray(gotValue)) {
          return { error: `expected ${key} to be an array` }
        }
        for (_value of gotValue) {
          const _compare = compareAgainstSchema(_value, _schema, key)
          if (_compare.error) {
            return _compare
          }
        }
      } else if (!compare.includes(gotValue)) { // expect an enum
        return { error: `expected ${key} to be ${compare.join(', ')}` }
      }
    } else if (isObjectLiteral(compare)) { // deep validate
      if (!isObjectLiteral(gotValue)) {
        return { error: `expected ${key} to be an object` }
      }
      compareAgainstSchema(gotValue, compare, key)
    }
  }

  return true
}

exports.compareAgainstSchema = compareAgainstSchema