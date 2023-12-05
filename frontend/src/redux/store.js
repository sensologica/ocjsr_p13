import { configureStore } from "@reduxjs/toolkit"
import userInformationReducer from "./slices/userInformation"

export default configureStore({
  reducer: {
    userInformation: userInformationReducer
  }
})