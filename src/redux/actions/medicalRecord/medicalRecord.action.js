import { axiosClientAuth } from "../../../config/AxiosClient";
import { getAllMedicalRecordSlice } from "../../slices/medicalRecordSlice/medicalRecord.slice";

export const createMedicalRecordAction = async (
  medicalAppointmentId,
  dataForm
) => {
  const newData = {
    ...dataForm,
    medicalAppointmentId,
  };

  console.log(newData);

  try {
    const { data } = await axiosClientAuth.post("/medical-record", newData);
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const getAllMedicalRecordAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/medical-record`);
      dispatch(getAllMedicalRecordSlice(data?.response));
      return data?.response;
    } catch (error) {
      console.error("Error al obtener la historia clínica:", error);
      return { error: error };
    }
  };
};

export const deleteMedicalRecordAction = async (medicalRecordId) => {
  try {
    const { data } = await axiosClientAuth.delete(
      `/medical-record/${medicalRecordId}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error insperado");
  }
};
