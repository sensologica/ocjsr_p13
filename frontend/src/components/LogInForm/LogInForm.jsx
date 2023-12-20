import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import ButtonSubmitForm from "../Buttons/ButtonSubmitForm"
import FormInputError from "../Errors/FormInputError/FormInputError"
import StatusToast from "../StatusToast/StatusToast"
import requestToken from "../../utils/requestToken"
import validatePassword from "../../utils/inputValidation/validatePassword"
import validateUsername from "../../utils/inputValidation/validateUsername"
import setPasswordError from "../../utils/inputValidation/setPasswordError"
import setUsernameError from "../../utils/inputValidation/setUsernameError"

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

  const initialStatusState = {
    isVisible: false,
    type: "error", // The two possible options are: "error" and "success".
    message: "",
  }

  const [status, setStatus] = useState(initialStatusState)

  const usernameInput = useRef(null)
  const passwordInput = useRef(null)
  const rememberMeInput = useRef(null)

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
      remember: e.target.checked,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const username = validateUsername(usernameInput.current.value)
    const password = validatePassword(passwordInput.current.value)

    const credentials = {
      email: usernameInput.current.value,
      password: passwordInput.current.value,
    }

    if (username.isValid && password.isValid) {
      const token = await requestToken(credentials)

      if (token.error) {
        setStatus({
          ...status,
          isVisible: true,
          type: "error", // The two possible options are: "error" and "success".
          message: "Invalid username or password.",
        })
      } else {
        localStorage.setItem("jwt-token", token)
        navigate("/profile")
      }
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input 
          type="text"
          id="username"
          value={inputs.username}
          ref={usernameInput}
          onChange={e => handleChange(e)}
          onBlur={e => {
            const username = validateUsername(e.target.value)
            setUsernameError(username, setErrors)
          }}
          autoFocus
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
          onBlur={e => {
            const username = validatePassword(e.target.value)
            setPasswordError(username, setErrors)
          }}
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
          ref={rememberMeInput}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="remember">Remember me</label>
      </div>
      <ButtonSubmitForm />
      { status.isVisible && <StatusToast status={status} /> }
    </form>
  )
}

export default LogInForm