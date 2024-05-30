import { Button, Card, Divider, Modal, Progress } from "antd"
import React, { useState } from "react"
import { LuTimer } from "react-icons/lu"
import { WiTime5, WiTime8 } from "react-icons/wi"
import { EmployeInformation } from "../../../utils/Interface/Dashboard"

interface ProgressBarProps {
  title: string
  percent: number
}

const TempProgressBar: React.FC<ProgressBarProps> = ({ title, percent }) => {
  const [show, setShow] = useState(false)

  const showModal = () => {
    setShow(!show)
  }

  return (
    <div
      className="col-span-6 hover:bg-blue-200 p-2 rounded-lg cursor-pointer"
      onClick={showModal}
    >
      <h1 className="text-slate-600 font-bold text-sm">{title}</h1>
      <Progress strokeWidth={20} percent={percent} status="active" />
      <Modal
        title={title}
        open={show}
        width={800}
        footer={() => {
          return (
            <Button className="w-32" type="primary" onClick={showModal}>
              Close
            </Button>
          )
        }}
      ></Modal>
    </div>
  )
}

const EmployeeInformation: React.FC<EmployeInformation> = (props) => {
  const info = () => {
    Modal.info({
      width: 800,
      title: <h1 className="text-lg font-bold text-slate-600">Team Mate</h1>,
      content: "",
      okText: "Close",
      onOk() {},
    })
  }

  return (
    <div>
      <Card className="shadow shadow-blue-300">
        {/* Employee Image And Employee Name */}
        <div className="grid grid-cols-12 space-x-2 mb-3">
          <img
            src={props.employeeUrl}
            className="w-16 rounded-lg col-span-12 xl:col-span-2"
            alt="User Profile"
          />
          <div className="col-span-12 xl:col-span-10">
            <h1 className="text-slate-600 font-bold text-lg">
              {props.employeeName}
            </h1>
            <span className="text-slate-600 text-lg">
              {props.employeeposition}
            </span>
          </div>
        </div>
        <Divider className="m-1" />

        {/* Employee Attendance */}
        <div className="grid grid-cols-12 gap-2 items-center py-3">
          <div className="col-span-3 justify-center">
            <div className="flex items-center justify-center gap-2 ">
              <WiTime8 className="text-blue-500 text-3xl" />
              <span className="font-bold text-slate-600">
                {props.timeIn ? props.timeIn : "-:-"}
              </span>
            </div>
            <div className="flex justify-center">
              <span className="font-medium text-sm text-slate-600">In</span>
            </div>
          </div>
          <div className="col-span-3 justify-center">
            <div className="flex items-center justify-center gap-2">
              <WiTime5 className="text-red-500 text-3xl" />
              <span className="font-bold text-slate-600">
                {props.timeOut ? props.timeOut : "-:-"}
              </span>
            </div>
            <div className="flex justify-center">
              <span className="font-medium text-sm text-slate-600 ">Out</span>
            </div>
          </div>
          <div className="col-span-6">
            <Button
              type="primary"
              className="w-full rounded-xl flex items-center justify-center"
              icon={<LuTimer />}
            >
              Start Time
            </Button>
          </div>
        </div>
        <Divider className="m-1" />

        {/* Team Member And Supervisor */}
        <div className="grid grid-cols-12">
          <div className="col-span-8 px-2 ">
            <h1 className="text-slate-600 font-bold text-sm py-1">
              Team Member
            </h1>
            <div className="grid grid-cols-12">
              <div className="col-span-3">
                <img
                  src={props.employeeUrl}
                  className="w-16 rounded-lg col-span-2"
                  alt="User Profile"
                />
              </div>
            </div>
          </div>
          <div className="col-span-4 px-2">
            <h1 className="text-slate-600 font-bold text-sm py-1 text-end">
              Supervisor
            </h1>
            <div className="w-full flex justify-end">
              <img
                src={props.employeeUrl}
                className="w-16 rounded-lg col-span-2"
                alt="User Profile"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center py-1">
          <Button
            type="link"
            className="text-slate-600 font-bold text-sm"
            onClick={info}
          >
            View More
          </Button>
        </div>
        <Divider className="m-1" />

        {/* Leave And Reimbursement Balance */}
        <div className="grid grid-cols-12 gap-3 py-2 ">
          <div className="col-span-12 xl:col-span-6">
            <TempProgressBar title="Leave Balance" percent={50} />
          </div>
          <div className="col-span-12 xl:col-span-6">
            <TempProgressBar title="Reimbursement Balance" percent={54} />
          </div>
        </div>
        <Divider className="m-1" />

        {/* Task Completion */}
        <h1 className="text-slate-600 font-bold text-sm py-1">
          YOUR TASK COMPLETION
        </h1>
        <span className="text-slate-600 text-xs font-semibold">Ratio</span>
        <Progress strokeWidth={15} percent={20} status="active" />
        <div className="flex justify-between items-center space-x-2 pt-3">
          <span className="text-slate-600 text-xs font-semibold">
            You have 0 more task to do
          </span>
          <Button type="primary" ghost>
            Details
          </Button>
        </div>

        {/* Weekly Calender */}
      </Card>
    </div>
  )
}

export default EmployeeInformation
