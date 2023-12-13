import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import ButtonSubmitForm from "../Buttons/ButtonSubmitForm"
import FormInputError from "../Errors/FormInputError/FormInputError"
import requestToken from "../../utils/requestToken"

const LogInForm = () => {
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    remember: false,
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })

  const usernameInput = useRef(null)
  const passwordInput = useRef(null)

  const validateUsername = () => {
    const username = usernameInput.current.value
    const regex = /^[\w\.-]+@[\w\.-]+\.[\w]{2,4}$/g

    const isEmpty = username === ""
    const isValid = regex.test(username)

    if (isEmpty){
      setErrors(prevState => ({
        ...prevState,
        username: "The username must not be empty.",
      }))
      return false
    } else if (!isValid) {
      setErrors(prevState => ({
        ...prevState,
        username: "The username must be a valid email address.",
      }))
      return false
    } else if (isValid) {
      setErrors(prevState => ({
        ...prevState,
        username: "",
      }))
      return true
    }
  }

  const validatePassword = () => {
    const password = passwordInput.current.value
    const regex = /^.{8,}$/g

    const isEmpty = password === ""
    const isValid = regex.test(password)

    if (isEmpty){
      setErrors(prevState => ({
        ...prevState,
        password: "The password must not be empty."
      }))
      return false
    } else if (!isValid) {
      setErrors(prevState => ({
        ...prevState,
        password: "The password must be at least 8 characters long.",
      }))
      return false
    } else if (isValid) {
      setErrors(prevState => ({
        ...prevState,
        password: "",
      }))
      return true
    }
  }

  /**
   * Updates the local state of the form component every time a user types
   * anything into the inputs. This is what allows the inputs to be "controlled"
   * by React.
   */
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
      remember: e.target.checked,
    })
  }

  const handleSubmit = async (event, navigate) => {
    event.preventDefault()
    const usernameIsValid = validateUsername()
    const passwordIsValid = validatePassword()

    const credentials = {
      email: inputs.username,
      password: inputs.password,
    }

    if (usernameIsValid && passwordIsValid) {
      const token = await requestToken(credentials)
      // TODO: Add error handling.
      // TODO: Make sure the token has been granted and saved before redirecting.
      localStorage.setItem("jwt-token", token)
      navigate("/profile")
    } else {
      console.log("ERROR: Improperly formatted inputs.")
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event, navigate)}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input 
          type="text"
          id="username"
          value={inputs.username}
          ref={usernameInput}
          onChange={(e) => handleChange(e)}
          onBlur={() => validateUsername()}
        />
        <FormInputError
          errorMessage={errors.username}
          isVisible={!!errors.username}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={inputs.password}
          ref={passwordInput}
          onChange={(e) => handleChange(e)}
          onBlur={() => validatePassword()}
        />
        <FormInputError
          errorMessage={errors.password}
          isVisible={!!errors.password}        
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember"
          value={inputs.remember}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="remember">Remember me</label>
      </div>
      <ButtonSubmitForm />
    </form>
  )
}

export default LogInForm