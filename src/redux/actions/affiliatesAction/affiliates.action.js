import { axiosClientAuth } from "../../../config/AxiosClient";

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
