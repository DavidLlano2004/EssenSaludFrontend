import { axiosClientAuth } from "../../../config/AxiosClient";
import { getOneAffiliateSlice } from "../../slices/affiliatesSlice/Affiliate.Slice";

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
      return data
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};
