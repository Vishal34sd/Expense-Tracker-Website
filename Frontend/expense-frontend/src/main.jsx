import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/userDashBoard.jsx'
import ExpenseAdd from './pages/ExpenseAdd.jsx'
import AllTransaction from './pages/AllTransaction.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
   {
    path: "/register",
    element: <SignUp />
  },
   {
    path: "/login",
    element: <SignIn />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
   {
    path: "/add",
    element: <ExpenseAdd/>
  },
   {
    path: "/addTransaction",
    element: <AllTransaction/>
  }


]);

createRoot(document.getElementById('root')).render(

  <RouterProvider router={appRouter} />
)
