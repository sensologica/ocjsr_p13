import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function MainNav({ isLoggedIn }) {
  const firstName = useSelector(state => state.userInformation.firstName)

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        { 
          isLoggedIn 
          ? 
            <>
              <Link to="/profile" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                {firstName}
              </Link>
              <Link to="/" className="main-nav-item">
                <i className="fa fa-sign-out"></i>
                Sign Out
              </Link>
            </>          
          : 
            <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
        }
      </div>
    </nav>  
  )
}