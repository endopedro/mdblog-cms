import _ from 'lodash'

const setErrors = (setError, errors) => {
  if (_.isObject(errors)) {
    for (var [key, value] of Object.entries(errors)) {
      setError(key, {
        type: 'manual',
        message: value.join(', '),
      })
    }
  }
}

export { setErrors }
