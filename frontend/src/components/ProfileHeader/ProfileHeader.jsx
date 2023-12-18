import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editFirstName, editLastName } from "../../redux/slices/userInformation"
import TextInput from "../TextInput/TextInput"
import Button from "../Buttons/Button"
import StatusToast from "../StatusToast/StatusToast"
import writeToDatabase from "../../utils/writeToDatabase"
import "./ProfileHeader.css"

const ProfileHeader = () => {
  const initialStatusState = {
    isVisible: false,
    type: "error", // The two possible options are: "error" and "success".
    message: "",
  }

  const [status, setStatus] = useState(initialStatusState)
  const [editModeEnabled, setEditModeEnabled] = useState(false)

  const firstNameInput = useRef(null)
  const lastNameInput = useRef(null)

  const dispatch = useDispatch()

  const userFirstName = useSelector(state => state.userInformation.firstName)
  const userLastName = useSelector(state => state.userInformation.lastName)

  useEffect(() => {
    const token = localStorage.getItem("jwt-token")

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
      dispatch(editFirstName(userData.body.firstName))
      dispatch(editLastName(userData.body.lastName))
    })
    .catch(error => {
      console.log(error.message)
    })
  }, [dispatch])

  const enterEditMode = () => {
    setEditModeEnabled(true)
  }

  const quitEditMode = () => {
    setEditModeEnabled(false)
  }

  const clearStatus = () => {
    setStatus(initialStatusState)
  }

  const displayStatus = () => {
    if (status.type === "success") {
      setTimeout(
        () => setStatus({...status, isVisible: false}),
        2500
      )
    }
    return <StatusToast status={status} />
  }

  const handleSave = () => {
    clearStatus()

    const newFirstName = firstNameInput.current.value
    const newLastName = lastNameInput.current.value

    if (userFirstName === newFirstName && userLastName === newLastName) {
      // If no changes to input values have been made...
      quitEditMode()
      return
    } else if (newFirstName === "" || newLastName === "") {
      // If one or both inputs are empty, show an error message.
      setStatus({
        isVisible: true,
        type: "error",
        message: "The inputs must not be empty.",
      })
    } else {
      // Dispatch action to update the Redux store.
      dispatch(editFirstName(newFirstName.trim()))
      dispatch(editLastName(newLastName.trim()))

      // Then group the new values into a payload and make a call to the API to
      // write data to the database.
      writeToDatabase({
        firstName: newFirstName,
        lastName: newLastName,
      })
      .then(response => {
        if (response.ok) {
          // Show a "Success" status toast.
          setStatus({
            isVisible: true,
            type: "success",
            message: "Save successful.",
          })
        }
      })

      quitEditMode()
    }
  }

  const handleCancel = () => {
    // The call to `clearStatus()` below is needed to account for the following
    // scenario:
    // 
    // - User enters Edit Mode
    // - User makes one or both of the inputs empty
    // - User clicks "Save"
    // - A Status Toast of type "error" appears
    // - User clicks "Cancel"
    // - User enters Edit Mode again
    // - Problem: The previous status hasn't cleared, even thought the inputs
    //   are repopulated with non-empty values.
    //
    // By clearing status we can avoid this problem.

    clearStatus()
    quitEditMode()
  }
 
  return (
    <div className="header">
      <h1>Welcome back<br />{userFirstName} {userLastName}!</h1>
      { 
        editModeEnabled &&
        <div className="edit-mode-controls-container">
          <div className="edit-mode-inputs-container">
            <TextInput
              className="text-input first-name"
              name="first-name"
              value={userFirstName}
              ref={firstNameInput}
            />
            <TextInput
              className="text-input last-name"
              name="last-name"
              value={userLastName}
              ref={lastNameInput}
            />
          </div>
          <div className="edit-mode-buttons-container">
            <Button
              text="Save"
              className="button save-button"
              onClick={handleSave}
            />
            <Button
              text="Cancel"
              className="button cancel-button"
              onClick={handleCancel}
            />
          </div>
        </div>
      }    

      {
        !editModeEnabled &&
        <button className="edit-button" onClick={enterEditMode}>
          Edit Name
        </button>
      }

      { status.isVisible && displayStatus() }
    </div>
  )
}

export default ProfileHeader