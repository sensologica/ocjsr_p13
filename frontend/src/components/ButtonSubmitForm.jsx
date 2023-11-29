const ButtonSubmitForm = () => {
  return (
    <button className="sign-in-button">
      Sign In
    </button>
  )
}

export default ButtonSubmitForm


        // Navigate to Profile

      // Grab token from localStorage in the Profile component, then do the operations with the token.

      // fetch("http://localhost:3001/api/v1/user/profile", {
      //   method: "POST",
      //   headers: new Headers({
      //     "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
      //   })
      // })
      //   .then(response => response.json())
      //   .then(data => console.log(data))