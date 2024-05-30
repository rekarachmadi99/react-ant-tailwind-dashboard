import React from "react"
import Layouts from "../../../components/layouts/Layouts"
import { Card } from "antd"
import DataTable, { TableColumn } from "react-data-table-component"

type DataRow = {
  id: number
  name: string
  age: number
  email: any
}

const EmployeeInformation: React.FC = () => {
  const columns: TableColumn<DataRow>[] = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ]

  const data: DataRow[] = [
    {
      id: 1,
      name: "John Doe",
      age: 28,
      email: <div className="text-slate-500">john.doe@example.com</div>,
    },
    { id: 2, name: "Jane Smith", age: 34, email: "jane.smith@example.com" },
    { id: 3, name: "Sam Johnson", age: 23, email: "sam.johnson@example.com" },
    { id: 4, name: "Alice Brown", age: 29, email: "alice.brown@example.com" },
  ]

  return (
    <Layouts>
      <div className="space-y-2">
        <Card className="shadow shadow-blue-300">
          <div>
            <span className="font-bold text-slate-600 p-0">
              Employee Information
            </span>
          </div>
        </Card>
        <Card className="shadow shadow-blue-300">
          <DataTable className="" columns={columns} data={data} pagination />
        </Card>
      </div>
    </Layouts>
  )
}

export default EmployeeInformation
