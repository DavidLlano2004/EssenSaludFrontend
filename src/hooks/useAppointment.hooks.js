import { useDispatch } from "react-redux";
import { createAppointmentAction, getAllAppointmentsAction } from "../redux/actions/appointmentAction/appointment.action";

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

  return {
    createAppointmentFunction,
    getAllAppointmentsFunction
  };
};
