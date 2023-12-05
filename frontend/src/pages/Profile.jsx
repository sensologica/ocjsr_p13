import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editFirstName, editLastName } from "../redux/slices/userInformation"
import MainNav from "../components/MainNav"
import Footer from "../components/Footer"

const Profile = () => {
  const dispatch = useDispatch()
  const userFirstName = useSelector(state => state.userInformation.firstName)
  const userLastName = useSelector(state => state.userInformation.lastName)

  useEffect(() => {
    const token = localStorage.getItem("jwt-token")

    if (!token) {
      // navigate("/login") (This should be handled even before the redirect to profile page.)
      throw new Error("Authorization error: No token available.")
    }

    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      })
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(
          `Authorization error: ${response.status} ${response.statusText}`
        )
      }
      if(response.status === 200) {
        return response.json()
      }
    })
    .then(userData => {
      console.log(dispatch(editFirstName(userData.body.firstName)))
      dispatch(editFirstName(userData.body.firstName))
      dispatch(editLastName(userData.body.lastName))
    })
    .catch(error => {
      console.log(error.message)
    })
  }, [dispatch])

  return (
    <>
      <MainNav isLoggedIn={true} />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userFirstName} {userLastName}!</h1>
          <button className="edit-button" onClick={() => {
              console.log("Modifying name...")
              // Submit newly entered name to state and write to database
              // dispatch(first("Christophe2"))
              // dispatch(last("Tarrault2"))
            }
          }>Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Profile