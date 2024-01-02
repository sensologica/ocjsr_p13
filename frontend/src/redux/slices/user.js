import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    // Dispatches action: {type: "user/setFirstName"}
    setFirstName: (state, action) => {
      state.firstName = action.payload
    },
    // Dispatches action: {type: "user/setLastName"}
    setLastName: (state, action) => {
      state.lastName = action.payload
    },
    // Dispatches action: {type: "user/setUsername"}
    setUsername: (state, action) => {
      state.username = action.payload
    },
    // Dispatches action: {type: "user/setId"}
    setId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { 
  reset,
  setFirstName,
  setLastName,
  setUsername,
  setId
} = user.actions
export default user.reducer