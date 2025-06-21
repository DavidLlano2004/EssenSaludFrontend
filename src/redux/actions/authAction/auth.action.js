import { axiosClientAuth } from "../../../config/AxiosClient";
import { loginCase, singOffCase } from "../../slices/authSlice/Auth.Slice";

export const loginAppAction = async (user) => {
  //   return async (dispatch) => {
  try {
    const { data } = await axiosClientAuth.post("/login", user);
    //   dispatch(loginCase(data?.response))

    return { verify: true, response: data };
  } catch (error) {
    return { error: error?.response?.data?.message, verify: false };
  }
  //   };
};
export const registerAppAction = async (dataRegister) => {
  const { email, name, birthday, password } = dataRegister;
  const newData = {
    email,
    name,
    birthday,
    password,
    state: true,
    rol: "afiliado",
  };
  try {
    const response = await axiosClientAuth.post("/register", newData);
    return { verify: true, response: response?.data };
  } catch (error) {
    return { error: error, verify: false };
  }
};

export const verifyTokenRequest = async () => {
  try {
    const response = await axiosClientAuth.get("/verify");
    return response;
  } catch (error) {
    return { error: error };
  }
};

export const singOffCaseAction = async () => {
  try {
    const response = await axiosClientAuth.post("/logout");
    return response;
  } catch (error) {
    console.error(error);
  }
};
