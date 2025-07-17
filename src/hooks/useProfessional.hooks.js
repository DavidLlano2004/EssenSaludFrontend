import { useDispatch } from "react-redux";
import {
  createProfessionalAction,
  getAllProfessionalsAction,
  getOneProfessionalAction,
} from "../redux/actions/professionalAction/professional.action";
import { useUsers } from "./useUsers.hooks";

export const useProfessional = () => {
  const dispatch = useDispatch();
  const { updateUserFunction } = useUsers();

  const createProfessionalFunction = async ({
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();

    try {
      const response = await createProfessionalAction(dataForm);

      if (!response || response?.error) {
        console.error("Error al profesional el centro", response?.error);
        return { state: 500, error: response?.error };
      }

      const userId = dataForm?.userId;

      const responseUpdateState = await updateUserFunction({
        userId,
        dataForm: { state: true },
      });

      if (!responseUpdateState || responseUpdateState?.error) {
        console.error(
          "Error al actualizar estado de usuario",
          responseUpdateState?.error
        );
        return { state: 500, error: responseUpdateState?.error };
      }

      onSuccess(responseUpdateState);

      return { state: 200, responseUpdateState };
    } catch (error) {
      return { state: 500, error };
    }
  };

  const getOneProfessionalFunction = async (idProfessional) => {
    try {
      const data = await dispatch(getOneProfessionalAction(idProfessional));
      if (data?.error) {
        console.error("Error al obtener el profesional:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };
  const getAllProfessionalsFunction = async () => {
    try {
      const data = await dispatch(getAllProfessionalsAction());
      if (data?.error) {
        console.error("Error al obtener los profesionales:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };

  return {
    createProfessionalFunction,
    getOneProfessionalFunction,
    getAllProfessionalsFunction
  };
};
