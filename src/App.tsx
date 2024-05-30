import React from "react"
import Router from "./config/router"
import IsLoginContextProvider from "./config/context/IsLoggedIn"

const App: React.FC = () => {
  return (
    <IsLoginContextProvider>
      <Router />
    </IsLoginContextProvider>
  )
}

export default App
