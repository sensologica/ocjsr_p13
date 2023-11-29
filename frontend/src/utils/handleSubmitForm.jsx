import validateCredentialsFormatting from "./validateCredentialsFormatting"
import requestToken from "./requestToken"

const handleSubmitForm = async (event, navigate) => {
  event.preventDefault()
  const credentials = {
    email: event.target.querySelector("#username").value,
    password: event.target.querySelector("#password").value
  }
  const isCredentialsFormattingValid = validateCredentialsFormatting(credentials)
  if (isCredentialsFormattingValid) {  
    const token = await requestToken(credentials)
    localStorage.setItem("jwt-token", token)
    navigate("/profile")
  } else {
    console.log("ERROR: Improperly formatted inputs.")
  }
}

export default handleSubmitForm