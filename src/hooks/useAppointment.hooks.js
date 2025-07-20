import { useDispatch } from "react-redux";
import {
  createAppointmentAction,
  deleteAppointmentAction,
  getAllAppointmentsAction,
  updateAppointmentAction,
} from "../redux/actions/appointmentAction/appointment.action";

export const useAppointment = () => {
  const dispatch = useDispatch();

  const createAppointmentFunction = async ({
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();
    try {
      const response = await createAppointmentAction(dataForm);
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

  const updateAppointmentFunction = async ({
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();
    try {
      const response = await updateAppointmentAction(dataForm);
      if (!response || response?.error) {
        console.error("Error al actualizar la cita", response?.error);
        return { state: 500, error: response?.error };
      }
      onSuccess(response);

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };

  const getAllAppointmentsFunction = async () => {
    try {
      const data = await dispatch(getAllAppointmentsAction());
      if (data?.error) {
        console.error("Error al obtener la cita:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };

  const deleteAppointmentFunction = async ({
    appointmentId,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();
    try {
      const response = await deleteAppointmentAction(appointmentId);
      if (!response || response?.error) {
        console.error("Error al eliminar la cita", response?.error);
        return { state: 500, error: response?.error };
      }
      onSuccess(response);

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };

  return {
    createAppointmentFunction,
    getAllAppointmentsFunction,
    updateAppointmentFunction,
    deleteAppointmentFunction
  };
};
