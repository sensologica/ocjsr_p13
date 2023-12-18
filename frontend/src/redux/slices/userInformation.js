import { createSlice } from "@reduxjs/toolkit"

export const userInformation = createSlice({
  name: "userInformation",
  initialState: {
    firstName: "",
    lastName: "",
    username: "",
    userId: undefined,
  },
  reducers: {
    // Dispatches action: {type: "userInformation/editFirstName"}
    editFirstName: (state, action) => {
      state.firstName = action.payload
    },
    // Dispatches action: {type: "userInformation/editLastName"}
    editLastName: (state, action) => {
      state.lastName = action.payload
    },
    // Dispatches action: {type: "userInformation/editUsername"}
    editUsername: (state, action) => {
      state.username = action.payload
    },
    // Dispatches action: {type: "userInformation/editUserId"}
    editUserId: (state, action) => {
      state.userId = action.payload
    }
  }
})

export const { 
  editFirstName,
  editLastName,
  editUsername,
  editUserId
} = userInformation.actions
export default userInformation.reducer