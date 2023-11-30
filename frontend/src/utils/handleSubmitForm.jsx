import validateFormInputs from "./validateFormInputs"
import requestToken from "./requestToken"
import requestAuthorization from "./requestAuthorization"

const handleSubmitForm = async (event, navigate) => {
  event.preventDefault()
  const credentials = {
    email: event.target.querySelector("#username").value,
    password: event.target.querySelector("#password").value
  }
  const areInputsValid = validateFormInputs(credentials)
  if (areInputsValid) {  
    const token = await requestToken(credentials)
    localStorage.setItem("jwt-token", token)
    const isAuthorized = await requestAuthorization()
    if (isAuthorized) navigate("/profile")
  } else {
    console.log("ERROR: Improperly formatted inputs.")
  }
}

export default handleSubmitForm