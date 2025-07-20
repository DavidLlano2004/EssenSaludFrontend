import { axiosClientAuth } from "../../../config/AxiosClient";

export const loginAppAction = async (user) => {
  try {
    const { data } = await axiosClientAuth.post("/login", user);

    return { verify: true, response: data };
  } catch (error) {
    return { error: error?.response?.data?.message, verify: false };
  }
};
export const registerAppAction = async (dataForm) => {
  const { email, name, birthday, password, rol, gender } = dataForm;
  const newData = {
    email,
    name,
    birthday,
    password,
    rol,
    gender,
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
