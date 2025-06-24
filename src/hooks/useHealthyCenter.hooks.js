import { useDispatch } from "react-redux";
import {
  createHealthyCenterAction,
  deleteHealthyCenterAction,
  getAllHealthyCentersAction,
  updateHealthyCenterAction,
} from "../redux/actions/healthyCenterAction/healthyCenter.action";

export const useHealthyCenter = () => {
  const dispatch = useDispatch();

  const getAllHealthyCentersFunction = async () => {
    try {
      const data = await dispatch(getAllHealthyCentersAction());
      if (data?.error) {
        console.error("Error al obtener centros:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };

  const createHealthyCenterFunction = async ({
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();

    try {
      const response = await createHealthyCenterAction(dataForm);

      if (!response || response?.error) {
        console.error("Error al crear el centro", response?.error);
        return { state: 500, error: response?.error };
      }

      onSuccess(response);

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };

  const updateHealthyCenterFunction = async ({
    healthyCenterId,
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();

    try {
      const response = await updateHealthyCenterAction(healthyCenterId , dataForm);

      if (!response || response?.error) {
        console.error("Error al editar el centro", response?.error);
        return { state: 500, error: response?.error };
      }

      onSuccess(response);

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };

  const deleteHealthyCenterFunction = async ({
    healthyCenterId,
    onStart = () => {},
    onSuccess = () => {},
  }) => {

    onStart();

    try {

      const response = await deleteHealthyCenterAction(healthyCenterId);

      if (response?.error) {
        console.error("Error al borrar centro", response?.error);
        return { state: 500, error: response?.error };
      }

      onSuccess();

      return { state: 200 };
    } catch (error) {
      errorCatch(error);
    }
  };

  return {
    getAllHealthyCentersFunction,
    createHealthyCenterFunction,
    deleteHealthyCenterFunction,
    updateHealthyCenterFunction
  };
};
