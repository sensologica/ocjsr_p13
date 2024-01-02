const unsetPasswordError = (setErrors) => {
  setErrors(prevState => ({
    ...prevState,
    password: "",
  }))
}

export default unsetPasswordError