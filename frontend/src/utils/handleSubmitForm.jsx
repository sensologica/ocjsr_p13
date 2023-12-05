import validateFormInputs from "./validateFormInputs"
import requestToken from "./requestToken"

const handleSubmitForm = async (event, navigate) => {
  event.preventDefault()
  const credentials = {
    email: event.target.querySelector("#username").value,
    password: event.target.querySelector("#password").value
  }
  const areInputsValid = validateFormInputs(credentials)
  if (areInputsValid) {  
    const token = await requestToken(credentials)
    // TODO: Add error handling.
    // TODO: Make sure the token has been granted and saved before redirecting.
    localStorage.setItem("jwt-token", token)
    navigate("/profile")
  } else {
    console.log("ERROR: Improperly formatted inputs.")
  }
}

export default handleSubmitForm