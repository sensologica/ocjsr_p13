import { useNavigate } from "react-router-dom"
import MainNav from "../components/MainNav"
import Footer from "../components/Footer"
import ButtonSubmitForm from "../components/ButtonSubmitForm"
import handleSubmitForm from "../utils/handleSubmitForm"

const LogIn = () => {
  const navigate = useNavigate()
  return (
    <>
      <MainNav isLoggedIn={false} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
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
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LogIn