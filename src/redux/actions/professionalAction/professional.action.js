import { axiosClientAuth } from "../../../config/AxiosClient";
import { getAllProfessionalsSlice, getOneProfessionalSlice } from "../../slices/professinalSlice/Professional.Slice";

export const createProfessionalAction = async (dataForm) => {
  try {
    const { data } = await axiosClientAuth.post("/professionals", dataForm);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const getOneProfessionalAction = (idProfessional) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(
        `/professionals/${idProfessional}`
      );
      dispatch(getOneProfessionalSlice(data.response));
      return data;
    } catch (error) {
      console.error(error);
      return { error: error?.response?.data?.message };
    }
  };
};

export const getAllProfessionalsAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/professionals`);
      dispatch(getAllProfessionalsSlice(data.response));
      return data;
    } catch (error) {
      console.error(error);
      return { error: error?.response?.data?.message };
    }
  };
};
