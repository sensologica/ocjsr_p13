import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth"
import userInformationReducer from "./slices/userInformation"

export default configureStore({
  reducer: {
    auth: authReducer,
    userInformation: userInformationReducer
  }
})