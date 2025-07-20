import { axiosClientAuth } from "../../../config/AxiosClient";
import { getAllAppointmentsSlice } from "../../slices/appointmentSlice/appointment.slice";

export const createAppointmentAction = async (dataForm) => {
  const { date, time, affiliateId, healthyCenterId, professionalId } = dataForm;

  const newData = {
    date,
    time,
    affiliateId: affiliateId?.value,
    healthyCenterId: healthyCenterId?.value,
    professionalId: professionalId?.value,
    state: "programada",
  };

  console.log(newData);

  try {
    const { data } = await axiosClientAuth.post(
      "/medical-appointment",
      newData
    );
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const updateAppointmentAction = async (dataForm) => {
  const {
    idAppointment,
    state,
    date,
    time,
    affiliateId,
    professionalId,
    healthyCenterId,
  } = dataForm;

  const newData = {
    state,
    date,
    time,
    affiliateId: affiliateId?.value,
    healthyCenterId: healthyCenterId?.value,
    professionalId: professionalId?.value,
  };

  try {
    const { data } = await axiosClientAuth.put(
      `/medical-appointment/${idAppointment}`,
      newData
    );
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const getAllAppointmentsAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/medical-appointment`);

      dispatch(getAllAppointmentsSlice(data.response));

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};
export const deleteAppointmentAction = async (appointmentId) => {
  try {
    const { data } = await axiosClientAuth.delete(
      `/medical-appointment/${appointmentId}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error insperado");
  }
};
