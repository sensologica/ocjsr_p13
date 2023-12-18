const validatePassword = (password) => {
  const regex = /^.{8,}$/g
  return {
    isEmpty: password === "",
    isValid: regex.test(password),
  }
}

export default validatePassword