import React from "react"
import { Card } from "antd"

interface AuthProps {
  children: React.ReactNode
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  return (
    <main className="w-screen h-screen pr-2 flex items-center justify-center bg-blue-50">
      <Card className="shadow-xl shadow-blue-100 w-11/12 md:w-1/2 lg:w-1/3 fixed">
        {children}
      </Card>
    </main>
  )
}

export default Auth
