import { createSlice } from "@reduxjs/toolkit"

export const user = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
  },
  reducers: {
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
  setFirstName,
  setLastName,
  setUsername,
  setId
} = user.actions
export default user.reducer