import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: undefined,
  isAuthorized: false,
  rememberMe: false,
}

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
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
  reset,
  setIsAuthorized,
  setToken,
  setRememberMe
} = auth.actions
export default auth.reducer