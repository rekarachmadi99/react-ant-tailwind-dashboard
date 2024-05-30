import React, { useState } from "react"
import { Alert, Button, Form, Input } from "antd"
import { useNavigate } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa"
import axios, { AxiosError } from "axios"
import Auth from "../../components/auth/Auth"
import { AlertProps } from "../../utils/Interface/Alert"
import { forgetPassword } from "../../config/api/Auth"

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [alertText, setAlertText] = useState<string>("")
  const [alertStatus, setAlertStatus] = useState<string>("")
  const navigate = useNavigate()

  const handleForgetPassword = async () => {
    try {
      const response = await forgetPassword(email)
      const responseData = response.data as AlertProps
      setAlert(responseData.msg, responseData.status)
    } catch (error) {
      handleAxiosError(error)
    }
  }

  const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      setTimeout(() => {
        const responseData = axiosError.response?.data as AlertProps
        setAlert(responseData?.msg, responseData?.status)
      }, 1000)
    } else {
      console.error("Unknown error:", error)
    }
  }

  const setAlert = (msg: string, status: string) => {
    setAlertText(msg)
    setAlertStatus(status)
    setTimeout(clearAlert, 5000)
  }

  const clearAlert = () => {
    setAlertText("")
    setAlertStatus("")
  }

  return (
    <Auth>
      <Form onFinish={handleForgetPassword}>
        <div
          className="flex items-center mb-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaAngleLeft />{" "}
          <p className="text-base font-semibold">Back to login</p>
        </div>
        {alertText && (
          <Alert
            className={`text-base font-medium ${
              alertStatus !== "success" ? "text-red-600" : "text-green-600"
            } my-2`}
            message={alertText}
            type={alertStatus !== "success" ? "error" : "success"}
          />
        )}
        <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
        <p className="text-lg text-slate-500 mb-5">
          To reset your password, enter your e-mail address below
        </p>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email." }]}
        >
          <Input
            size="large"
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-blue-500 w-full font-semibold"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Auth>
  )
}

export default ForgetPassword
