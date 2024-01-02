import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import ButtonSubmitForm from "../Buttons/ButtonSubmitForm"
import FormInputError from "../Errors/FormInputError/FormInputError"
import StatusToast from "../StatusToast/StatusToast"
import requestToken from "../../utils/requestToken"
import {
  setIsAuthorized,
  setToken,
  setRememberMe
} from "../../redux/slices/auth"

// Input validation imports
import validatePassword from "../../utils/inputValidation/validatePassword"
import setPasswordError from "../../utils/inputValidation/setPasswordError"
import unsetPasswordError from "../../utils/inputValidation/unsetPasswordError"
import validateUsername from "../../utils/inputValidation/validateUsername"
import setUsernameError from "../../utils/inputValidation/setUsernameError"
import unsetUsernameError from "../../utils/inputValidation/unsetUsernameError"

const LogInForm = () => {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()

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
    const username = validateUsername(usernameInput.current.value)
    const password = validatePassword(passwordInput.current.value)
    if (username.isEmpty) unsetUsernameError(setErrors)
    if (password.isEmpty) unsetPasswordError(setErrors)

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

    if (username.isEmpty) setUsernameError(username, setErrors)
    if (password.isEmpty) setPasswordError(password, setErrors)

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
        dispatch(setIsAuthorized(true))
        dispatch(setToken(token))
        dispatch(setRememberMe(rememberMeInput.current.checked))
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
            if (username.isEmpty || username.isValid) unsetUsernameError(setErrors)
            if (!username.isEmpty && !username.isValid) setUsernameError(username, setErrors)
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
            const password = validatePassword(e.target.value)
            if (password.isEmpty || password.isValid) unsetPasswordError(setErrors)
            if (!password.isEmpty && !password.isValid) setPasswordError(password, setErrors)
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