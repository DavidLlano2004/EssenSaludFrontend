import { axiosClientAuth } from "../../../config/AxiosClient";
import {
  getAllAffiliatesSlice,
  getOneAffiliateSlice,
  getUpcomingAppointmentsSlice,
} from "../../slices/affiliatesSlice/Affiliate.Slice";

export const createAffiliateAction = async (dataForm) => {
  const newData = {
    ...dataForm,
    healthyPlanId: null,
  };

  try {
    const { data } = await axiosClientAuth.post("/affiliate", newData);
    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const getInfoAffiliateAction = (idAffiliate) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/affiliate/${idAffiliate}`);

      dispatch(getOneAffiliateSlice(data.response));
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};

export const getAllAffiliatesAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/affiliates`);

      dispatch(getAllAffiliatesSlice(data.response));
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};

export const getUpcomingAppointmentsAction = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(
        `/affiliate/appointments/upcoming/${userId}`
      );

      dispatch(getUpcomingAppointmentsSlice(data.response));
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};

export const updateAffiliateAction = async (dataForm, idAffiliate) => {
  try {
    const { data } = await axiosClientAuth.put(
      `/affiliate/${idAffiliate}`,
      dataForm
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error insperado");
  }
};
