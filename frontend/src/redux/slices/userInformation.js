import { createSlice } from '@reduxjs/toolkit'

export const userInformation = createSlice({
  name: 'userInformation',
  initialState: {
    firstName: "",
    lastName: ""
  },
  reducers: {
    // Dispatches action: {type: "userInformation/editFirstName"}
    editFirstName: (state, action) => {
      state.firstName = action.payload
    },
    // Dispatches action: {type: "userInformation/editLastName"}
    editLastName: (state, action) => {
      state.lastName = action.payload
    }
  }
})

export const { 
  editFirstName,
  editLastName
} = userInformation.actions
export default userInformation.reducer