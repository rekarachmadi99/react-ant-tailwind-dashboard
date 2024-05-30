import React from "react"
import { Card } from "antd"

const Notification: React.FC = () => {
  return (
    <Card
      className="shadow shadow-blue-300"
      title={
        <div className="text-slate-600 text-lg font-bold">Notifications</div>
      }
    ></Card>
  )
}

export default Notification
