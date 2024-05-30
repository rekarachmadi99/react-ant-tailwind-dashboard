import React, { useEffect } from "react"
import EmployeeInformation from "./EmployeeInformation"
import CompanyNews from "./CompanyNews"
import Notification from "./Notification"
import CompanyPolicy from "./CompanyPolicy"
import EmployeeBirthday from "./EmployeeBirthday"
import Layouts from "../../../components/layouts/Layouts"
import { EmployeInformation } from "../../../utils/Interface/Dashboard"

const Dashboard: React.FC = () => {
  useEffect(() => {}, [])

  const userData: EmployeInformation = {
    employeeName: "Reka Rachmadi Apriansyah",
    employeeposition: "Software Engineer",
    employeeUrl: "",
    timeIn: "08:15",
    timeOut: "17:31",
  }

  return (
    <Layouts>
      <div className="grid grid-cols-12 gap-2 p-2">
        <div className="col-span-12 lg:col-span-4">
          <EmployeeInformation {...userData} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Notification />
        </div>
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <CompanyNews />
          <CompanyPolicy />
          <EmployeeBirthday />
        </div>
      </div>
    </Layouts>
  )
}

export default Dashboard
