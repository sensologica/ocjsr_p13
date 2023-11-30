import { useNavigate } from "react-router-dom"
import ButtonSubmitForm from "./ButtonSubmitForm"
import handleSubmitForm from "../utils/handleSubmitForm"

const LogInForm = () => {
  const navigate = useNavigate()
  return (
    <form onSubmit={(event) => handleSubmitForm(event, navigate)}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <ButtonSubmitForm />
    </form>
  )
}

export default LogInForm