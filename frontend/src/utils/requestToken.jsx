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
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return response.json()
  })
  .then(json => {
    console.log("SUCCESS: Token obtained.", json)
    const token = json.body.token
    return token
  })
  .catch((error) => {
    return {
      error: true,
      errorMessage: error,
    }
  })
}

export default requestToken
