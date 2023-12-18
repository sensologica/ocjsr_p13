import MainNav from "../components/MainNav/MainNav"
import LogInForm from "../components/LogInForm/LogInForm"
import Footer from "../components/Footer/Footer"

const LogIn = () => {
  return (
    <>
      <MainNav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <LogInForm />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default LogIn