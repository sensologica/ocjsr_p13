import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Homepage from './pages/Homepage.jsx'
import SignIn from './pages/SignIn.jsx'
import User from './pages/User.jsx'
import "./main.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route 
        path="/"
        element={<Homepage />}
        // errorElement={<RoutingError />}
      />
      <Route 
        path="/sign-in"
        element={<SignIn />}
        // errorElement={<RoutingError />}
      />
      <Route 
        path="/user"
        element={<User />}
        // errorElement={<RoutingError />}
      />
      {/* <Route element={<PageLayout />}>
        <Route
          path="/user/:userId"
          element={<Dashboard />}
          errorElement={<RoutingError />}
          loader={
            ({ params }) => {
              const userId = parseInt(params.userId)
              return isNaN(userId) 
                ? console.error("Error: Invalid user ID.")
                : userId
            }
          }
        />
      </Route> */}
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
