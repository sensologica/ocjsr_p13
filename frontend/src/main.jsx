import React from "react"
import ReactDOM from "react-dom/client"
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import store from "./redux/store"
import { Provider } from "react-redux"
import Homepage from "./pages/Home"
import LogIn from "./pages/LogIn"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import RoutingError from "./components/Errors/RoutingError/RoutingError"
import "./main.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route 
        path="/"
        element={<Homepage />}
        errorElement={<RoutingError />}
      />
      <Route 
        path="/login"
        element={<LogIn />}
        errorElement={<RoutingError />}
      />
      <Route 
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
        errorElement={<RoutingError />}
      />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
