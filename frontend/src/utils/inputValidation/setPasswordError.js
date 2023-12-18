const setPasswordError = (password, setErrors) => {
  if (password.isEmpty) {
    setErrors(prevState => ({
      ...prevState,
      password: "The password must not be empty."
    }))
  } else if (!password.isValid) {
    setErrors(prevState => ({
      ...prevState,
      password: "The password must be at least 8 characters long.",
    }))
  } else if (password.isValid) {
    setErrors(prevState => ({
      ...prevState,
      password: "",
    }))
  }
}

export default setPasswordError