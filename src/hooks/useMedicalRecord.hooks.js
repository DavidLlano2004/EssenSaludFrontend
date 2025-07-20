import { useDispatch } from "react-redux";
import { updateAppointmentAction } from "../redux/actions/appointmentAction/appointment.action";
import {
  createMedicalRecordAction,
  deleteMedicalRecordAction,
  getAllMedicalRecordAction,
} from "../redux/actions/medicalRecord/medicalRecord.action";

export const useMedicalRecord = () => {
  const dispatch = useDispatch();
  const createMedicalRecordFunction = async ({
    medicalAppointmentId,
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();
    try {
      const response = await createMedicalRecordAction(
        medicalAppointmentId,
        dataForm
      );
      if (!response || response?.error) {
        console.error("Error al crear la historia clínica", response?.error);
        return { state: 500, error: response?.error };
      }

      const secondDataform = {
        idAppointment: medicalAppointmentId,
        state: "realizada",
      };
      const responseUpdateAppointment = await updateAppointmentAction(
        secondDataform
      );
      if (!response || response?.error) {
        console.error("Error al actualizar la cita", response?.error);
        return { state: 500, error: response?.error };
      }

      onSuccess(responseUpdateAppointment);

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };
  const getAllMedicalRecordFunction = async () => {
    try {
      const data = await dispatch(getAllMedicalRecordAction());
      if (data?.error) {
        console.error("Error al obtener el afiliado:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };

  const deleteMedicalRecordFunction = async (idMedicalRecord) => {
    try {
      const response = await deleteMedicalRecordAction(idMedicalRecord);
      if (!response || response?.error) {
        console.error("Error al eliminar la cita", response?.error);
        return { state: 500, error: response?.error };
      }
      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };

  return {
    createMedicalRecordFunction,
    getAllMedicalRecordFunction,
    deleteMedicalRecordFunction,
  };
};
