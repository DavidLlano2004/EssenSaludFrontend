import { axiosClientAuth } from "../../../config/AxiosClient";

export const createAffiliateAction = async (dataForm) => {
  console.log(dataForm);

  try {
    const { data } = await axiosClientAuth.post("/affiliate", dataForm);
    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};
