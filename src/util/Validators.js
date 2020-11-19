const isEmpty = (string) => {
  if (string.trim() === '') return true
  else return false
}

export const validateLoginData = (data) => {
  let errors = {}

  if (isEmpty(data.email)) errors.email = 'Mag niet leeg zijn'
  if (isEmpty(data.password)) errors.password = 'Mag niet leeg zijn'

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
}
