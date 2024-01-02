const unsetUsernameError = (setErrors) => {
  setErrors(prevState => ({
    ...prevState,
    username: "",
  }))
}

export default unsetUsernameError