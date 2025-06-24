import { useDispatch } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
  updateUserAction,
} from "../redux/actions/userAction/user.action";
import { axiosClientAuth } from "../config/AxiosClient";

export const useUsers = () => {
  const dispatch = useDispatch();

  const errorFunction = (response) => {};

  const errorCatch = (err) => {
    console.error("Error inesperado:", err);
    return { state: 500, error: err };
  };

  const fetchAllUsers = async () => {
    try {
      const response = await dispatch(getAllUsersAction());

      if (response?.error) {
        console.error("Error al obtener usuarios:", response?.error);
        return { state: 500, error: response?.error };
      }

      errorFunction(response);

      return { state: 200 };
    } catch (err) {
      errorCatch(err);
    }
  };

  const deleteUserFunction = async (userId, SecondFunctionHelp) => {
    try {
      const response = await deleteUserAction(userId);

      if (response?.error) {
        console.error("Error al obtener usuarios:", response?.error);
        return { state: 500, error: response?.error };
      }

      SecondFunctionHelp();

      return { state: 200 };
    } catch (error) {
      errorCatch(error);
    }
  };

  const updateUserFunction = async ({
    userId,
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
    onError = () => {},
  }) => {
    
    onStart();

    try {
      const response = await updateUserAction(userId, dataForm);

      if (!response || response?.error) {
        console.error("Error al actualizar usuario:", response?.error);
        onError(response?.error || "Respuesta inválida");
        return { state: 500, error: response?.error };
      }

      onSuccess(response);

      return { state: 200, response };
    } catch (error) {
      onError(error);
      return { state: 500, error };
    }
  };

  return {
    fetchAllUsers,
    deleteUserFunction,
    updateUserFunction,
  };
};
