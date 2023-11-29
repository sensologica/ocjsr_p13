/**
 * Uses user credentials to request a JWT token from the API.
 * @param { Object } credentials - User's username and password.
 * @return { String } - A JWT token.
 */
const requestToken = (credentials) => {
  return fetch("http://localhost:3001/api/v1/user/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: new Headers({"Content-Type": "application/json"})
  })
  .then(response => {
    if (!response.ok) throw new Error("Invalid credentials or bad request.")
    return response.json()
  })
  .then(data => {
    console.log("SUCCESS: Token obtained.")
    const token = data.body.token
    return token
  })
  .catch(error => {
    console.log("ERROR: Token request failed.", error.message)
    return null
  })
}

export default requestToken
