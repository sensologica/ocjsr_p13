const setUsernameError = (username, setErrors) => {
  if (username.isEmpty){
    setErrors(prevState => ({
      ...prevState,
      username: "The username must not be empty.",
    }))
  } else if (!username.isValid) {
    setErrors(prevState => ({
      ...prevState,
      username: "The username must be a valid email address.",
    }))
  } else if (username.isValid) {
    setErrors(prevState => ({
      ...prevState,
      username: "",
    }))
  }
}

export default setUsernameError