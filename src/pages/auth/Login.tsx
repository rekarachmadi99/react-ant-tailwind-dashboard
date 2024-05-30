import React, { useContext, useState } from "react";
import { Alert, Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { IsLogin } from "../../config/context/IsLoggedIn";
import { loginProps } from "../../utils/Interface/Authentication";
import { signIn } from "../../config/api/Auth";
import Auth from "../../components/auth/Auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMsg, setShowAlertMsg] = useState<string>("");

  const { setIsLoggedIn } = useContext(IsLogin);

  const navigate = useNavigate();

  const loginHandler = async () => {
    const loginData: loginProps = {
      username: username,
      password: password,
    };
    await signIn(loginData)
      .then((response) => {
        setIsLoggedIn(true);
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("employee_id", response.data.employee_id);
        sessionStorage.setItem("email", response.data.email);
        navigate("/dashboard");
      })
      .catch((err: any) => {
        setShowAlertMsg(err.response.data.msg);
        setShowAlert(true);
        const timeout = setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        return () => clearTimeout(timeout);
      });
  };

  return (
    <Auth>
      <Form onFinish={loginHandler}>
        {showAlert && (
          <Alert
            className="h-16"
            message={
              <span className="text-red-800 text-base font-medium">
                {showAlertMsg}
              </span>
            }
            type="error"
            showIcon
          />
        )}
        <label className="font-semibold text-lg">Username</label>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username." }]}
        >
          <Input
            size="large"
            className="mt-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <label className="font-semibold text-lg">Password</label>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password." }]}
        >
          <Input.Password
            size="large"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <div className="flex justify-between">
          <Form.Item name="remember">
            <Checkbox
              className="text-base"
              checked={remember}
              onClick={() => {
                return setRemember(remember == false ? true : false);
              }}
            >
              Remember me
            </Checkbox>
          </Form.Item>
          <Button
            type="link"
            className="text-base"
            onClick={() => navigate("/forget-password")}
          >
            Forget Password !
          </Button>
        </div>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="bg-blue-500 w-full font-semibold"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Auth>
  );
};

export default Login;
