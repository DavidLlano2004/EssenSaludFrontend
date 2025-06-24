import { axiosClientAuth } from "../../../config/AxiosClient";

export const createProfessionalAction = async (dataForm) => {
  try {
    const { data } = await axiosClientAuth.post("/professionals", dataForm);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};
