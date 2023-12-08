import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ButtonSubmitForm from "./ButtonSubmitForm"
import { validateEmail, validatePassword } from "../utils/validateFormInputs"
import FormInputError from "../components/FormInputError"
import handleSubmitForm from "../utils/handleSubmitForm"

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

  const isUsernameValid = (e) => {
    const isInputEmpty = !e.target.value
    const isUsernameValid = validateEmail(e.target.value)
    
    if(isInputEmpty || isUsernameValid) {
      setErrors({
        ...errors,
        username: "",
      })
    } else if(!isUsernameValid) {
      setErrors({
        ...errors,
        username: "The username must be a valid email address.",
      })
    }
  }

  const isPasswordValid = (e) => {
    const isInputEmpty = !e.target.value
    const isPasswordValid = validatePassword(e.target.value)

    if(isInputEmpty || isPasswordValid) {
      setErrors({
        ...errors,
        password: "",
      })
    } else if (!isPasswordValid) {
      setErrors({
        ...errors,
        password: "The password must be at least 8 characters long.",
      })
    }
  }


  // const errorMessages = {
  //   username: {
  //     badFormatting: "The username must be a valid email address.",
  //     notRecognized: "No user is associated with this username.",
  //     empty: "The username field must not be empty.",
  //   },
  //   password: {
  //     badFormatting: "The password must be at least 8 characters long.",
  //     incorrect: "The entered password is incorrect.",
  //     empty: "The password field must not be empty",
  //   },
  // }

  return (
    <form onSubmit={(event) => handleSubmitForm(event, navigate)}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input 
          type="text"
          id="username"
          value={inputs.username}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => isUsernameValid(e)}
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
          onChange={(e) => handleChange(e)}
          onBlur={(e) => isPasswordValid(e)}
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