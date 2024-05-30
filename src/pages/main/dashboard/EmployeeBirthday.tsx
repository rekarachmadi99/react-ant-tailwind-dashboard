import React from "react"
import { Card } from "antd"

const EmployeeBirthday: React.FC = () => {
  return (
    <Card
      className="w-full shadow shadow-blue-300"
      title={
        <div className="text-slate-600 text-lg font-bold">
          Employee Birthday
        </div>
      }
    ></Card>
  )
}

export default EmployeeBirthday
