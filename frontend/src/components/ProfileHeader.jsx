import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editFirstName, editLastName } from "../redux/slices/userInformation"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import "./ProfileHeader.css"

const ProfileHeader = () => {
  const [editModeEnabled, setEditModeEnabled] = useState(false)

  const firstNameInput = useRef(null)
  const lastNameInput = useRef(null)

  const dispatch = useDispatch()
  const userFirstName = useSelector(state => state.userInformation.firstName)
  const userLastName = useSelector(state => state.userInformation.lastName)

  useEffect(() => {
    const token = localStorage.getItem("jwt-token")

    if (!token) {
      // TODO: navigate("/login") (This should be handled even before the redirect to profile page.)
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

  const handleEdit = () => {
    setEditModeEnabled(true)
  }

  const handleSave = () => {
    const newFirstName = firstNameInput.current.value
    const newLastName = lastNameInput.current.value
    dispatch(editFirstName(newFirstName))
    dispatch(editLastName(newLastName))
    // TODO: Write new name to the database via API call.

    const payload = {
      firstName: newFirstName,
      lastName: newLastName
    }

    writeToDatabase(payload)

    setEditModeEnabled(false)
  }

  const handleCancel = () => {
    setEditModeEnabled(false)
  }

  const writeToDatabase = (payload) => {
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
  
  return (
    <div className="header">
      <h1>Welcome back<br />{userFirstName} {userLastName}!</h1>
      { 
        editModeEnabled &&
        <div className="edit-mode-controls-container">
          <div className="edit-mode-inputs-container">
            <TextInput className="text-input first-name" name="first-name" value={userFirstName} ref={firstNameInput} />
            <TextInput className="text-input last-name" name="last-name" value={userLastName} ref={lastNameInput} />
          </div>
          <div className="edit-mode-buttons-container">
            <Button text="Save" className="button save-button" onClick={handleSave} />
            <Button text="Cancel" className="button cancel-button" onClick={handleCancel} />
          </div>
        </div>
      }    
      {
        !editModeEnabled &&
        <button className="edit-button" onClick={handleEdit}>Edit Name</button>
      }
    </div>
  )
}

export default ProfileHeader