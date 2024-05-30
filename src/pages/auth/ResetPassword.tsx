import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button, Form, Input } from "antd"
import { FaAngleLeft } from "react-icons/fa"
import Auth from "../../components/auth/Auth"
import { getResetPassword, resetPassword } from "../../config/api/Auth"

const ResetPassword: React.FC = () => {
  const { id } = useParams()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [isLinkValid, setLinkValidity] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResetPassword(id)
        setEmail(response.data.email)
        setLinkValidity(true)
      } catch (error: any) {
        setLinkValidity(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const validatePasswordConfirmation = (rule: any, value: string) => {
    rule = ""
    if (value && value !== password) {
      return Promise.reject("Password confirmation does not match.")
    } else {
      return Promise.resolve()
    }
  }

  const handleFormSubmit = async () => {
    try {
      await resetPassword(id, { email, password })
      navigate("/")
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <>
      {isLinkValid ? (
        <ResetPasswordForm
          email={email}
          onFinish={handleFormSubmit}
          validatePasswordConfirmation={validatePasswordConfirmation}
          password={password}
          setPassword={setPassword}
          passwordConfirmation={passwordConfirmation}
          setPasswordConfirmation={setPasswordConfirmation}
          navigate={navigate}
        />
      ) : (
        <Auth>
          <div className="text-center">
            <h2>
              The reset link has expired because the time limit has passed.
            </h2>
            <p>Please click the button below to return to the login page.</p>
            <Button type="primary" onClick={() => navigate("/")}>
              Back to Login Page
            </Button>
          </div>
        </Auth>
      )}
    </>
  )
}

interface ResetPasswordFormProps {
  email: string
  onFinish: (values: {
    email: string
    password: string
    passwordConfirmation: string
  }) => void
  validatePasswordConfirmation: (rule: any, value: string) => Promise<void>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  passwordConfirmation: string
  setPasswordConfirmation: React.Dispatch<React.SetStateAction<string>>
  navigate: ReturnType<typeof useNavigate>
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  onFinish,
  validatePasswordConfirmation,
  password,
  setPassword,
  passwordConfirmation,
  setPasswordConfirmation,
  navigate,
}) => {
  return (
    <Auth>
      <Form onFinish={onFinish}>
        <div
          className="flex items-center mb-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FaAngleLeft />{" "}
          <p className="text-base font-semibold">Back to login</p>
        </div>
        <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
        <p className="text-lg text-slate-500 mb-5">
          Your new password must be different from previous used passwords.
        </p>
        <Form.Item name="email" initialValue={email}>
          <Input size="large" variant="filled" readOnly />
        </Form.Item>
        <div className="grid grid-cols-12 md:space-x-3">
          <div className="col-span-12 md:col-span-6">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="col-span-12 md:col-span-6">
            <Form.Item
              name="passwordConfirmation"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirmation Password!",
                },
                { validator: validatePasswordConfirmation },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirmation Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Form.Item>
          </div>
        </div>
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

export default ResetPassword
