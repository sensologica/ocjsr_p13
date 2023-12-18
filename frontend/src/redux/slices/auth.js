import { createSlice } from "@reduxjs/toolkit"

export const auth = createSlice({
  name: "auth",
  initialState: {
    isAuthorized: false,
    token: undefined,
    rememberMe: false,
  },
  reducers: {
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload
    },
  }
})

export const {
  setIsAuthorized,
  setToken,
  setRememberMe
} = auth.actions
export default auth.reducer