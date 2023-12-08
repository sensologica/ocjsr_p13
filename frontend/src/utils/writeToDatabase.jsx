/** 
 * Writes user's new first and last names to the database by sending a PUT
 * request to the API.
 * @param { Object } payload - Contains new first and last name values.
 */
const writeToDatabase = (payload) => {
  // TODO: Handle errors:
  // - If no token exists.
  // - If the request to the API fails.

  const token = localStorage.getItem("jwt-token")

  fetch("http://localhost:3001/api/v1/user/profile", {
    method: "PUT",
    headers: new Headers({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(payload)
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.warn("ERROR:", error)
  }) 
}

export default writeToDatabase