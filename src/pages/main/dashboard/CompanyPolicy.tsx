import React from "react"
import { Card } from "antd"

const CompanyPolicy: React.FC = () => {
  return (
    <Card
      className="w-full shadow shadow-blue-300"
      title={
        <div className="text-slate-600 text-lg font-bold">Company Policy</div>
      }
    ></Card>
  )
}

export default CompanyPolicy
