const validateUsername = (username) => {
  const regex = /^[\w\.-]+@[\w\.-]+\.[\w]{2,4}$/g
  return {
    isEmpty: username === "",
    isValid: regex.test(username),
  }
}

export default validateUsername