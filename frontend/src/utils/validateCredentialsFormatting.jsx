/**
 * Checks email validity. Returns true if email is not empty and is
 * formatted correctly. Returns false otherwise.
 * @param { String } email - A email to validate (user's email address).
 * @return { Boolean }
 */
const validateEmail= (email) => {
  const regex = /^[\w\.-]+@[\w\.-]+\.[\w]{2,4}$/g
  return regex.test(email)
}

/**
 * Checks password validity. Password length should be between 8 and 64 chars.
 * @param { String } password - A user's password to validate.
 * @return { Boolean }
 */
const validatePassword = (password) => {
  const regex = /^.{8,64}$/g
  return regex.test(password)
}

/**
 * Checks if all form inputs are valid and ready to submit.
 * @param { Object } - An object containing the values of email and password.
 * @return { Boolean } - True if both input values are valid. False otherwise.
 */
const validateCredentialsFormatting = ({ email, password }) => {
  const emailIsValid = validateEmail(email)
  const passwordIsValid = validatePassword(password)
  return emailIsValid && passwordIsValid
}

export default validateCredentialsFormatting