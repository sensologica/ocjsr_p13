/**
 * Uses token (if available) to request access to protected resources.
 * @return { Boolean } - True if access granted, false otherwise.
 */
const requestAuthorization = () => {
  const token = localStorage.getItem("jwt-token")

  if (!token) {
    console.log("Authorization error: No token available.")
    return false
  }

  return fetch("http://localhost:3001/api/v1/user/profile", {
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
  .then(() => {
    return true
  })
  .catch(error => {
    console.log(error.message)
    return false
  })
}

export default requestAuthorization