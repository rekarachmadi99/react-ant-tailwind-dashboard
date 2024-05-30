import axios from "axios";
import { loginProps } from "../../utils/Interface/Authentication";
import { baseUrl } from "../../utils/environments/environment";

export const signIn = async (loginData: loginProps) => {
  return await axios.post(`${baseUrl}authentication/signin`, loginData);
};

export const forgetPassword = async (email: string) => {
  return await axios.post(`${baseUrl}authentication/forget-password`, {
    email: email,
  });
};

export const getResetPassword = async (id: any) => {
  return await axios.get(`${baseUrl}authentication/get-reset-password/${id}`);
};

export const resetPassword = async (
  id: any,
  values: { email: string; password: string }
) => {
  return await axios.put(`${baseUrl}authentication/reset-password`, {
    key_account: id,
    email: values.email,
    password: values.password,
  });
};
