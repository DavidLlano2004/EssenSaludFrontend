import { axiosClientAuth } from "../../../config/AxiosClient";
import { loginCase, singOffCase } from "../../slices/authSlice/Auth.Slice";

export const loginAppAction = async (user) => {//funcion que hace el llamado para loguear un usuario
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
export const registerAppAction = async (dataForm) => {//funcion que hace el llamado apra registrar un usuario
  const { email, name, birthday, password , rol } = dataForm;//desestructuración de los datos del formulario
  const newData = {
    email,
    name,
    birthday,
    password,
    rol,
  };
  try {// intenta registrar al usuario
    const response = await axiosClientAuth.post("/register", newData);// hace la petición para registrar al usuario
    return { verify: true, response: response?.data };// si la respuesta es exitosa
  } catch (error) {// si ocurre un error
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