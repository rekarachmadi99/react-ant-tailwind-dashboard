import React, { useContext, useEffect } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { IsLogin } from "../context/IsLoggedIn"
import Login from "../../pages/auth/Login"
import ForgetPassword from "../../pages/auth/ForgetPassword"
import ResetPassword from "../../pages/auth/ResetPassword"
import Dashboard from "../../pages/main/dashboard/Dashboard"
import CompanyNews from "../../pages/main/settings/companyNews/CompanyNews"
import CompanyPolicy from "../../pages/main/settings/companyPolicy/CompanyPolicy"
import EmployeeInformation from "../../pages/main/employeeInformation/EmployeeInformation"

const Router: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLogin)

  useEffect(() => {
    const loggedInFromStorage = sessionStorage.getItem("isLoggedIn")

    if (loggedInFromStorage !== null) {
      const isLoggedInValue = loggedInFromStorage === "true"

      setIsLoggedIn(isLoggedInValue)
    }
  }, [isLoggedIn])
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/forget-password"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <ForgetPassword />
          }
        />
        <Route
          path="/reset-password/:id"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <ResetPassword />
          }
        />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/employee/employee-information"
          element={isLoggedIn ? <EmployeeInformation /> : <Navigate to="/" />}
        />
        <Route
          path="/settings/company/company-news"
          element={isLoggedIn ? <CompanyNews /> : <Navigate to="/" />}
        />
        <Route
          path="/settings/company/company-policy"
          element={isLoggedIn ? <CompanyPolicy /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
