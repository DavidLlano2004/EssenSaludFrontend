import { axiosClientAuth } from "../../../config/AxiosClient";
import { getAllHealthyPlansSlice } from "../../slices/healthyPlansSlice/healthyPlans.slice";

export const getAllHealthyPlansAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/healthy-plan`);
      dispatch(getAllHealthyPlansSlice(data?.response));
      return data;
    } catch (error) {
      return { error: error };
    }
  };
};