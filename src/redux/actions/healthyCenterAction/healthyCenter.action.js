import { axiosClientAuth } from "../../../config/AxiosClient";
import { getAllHealthyCentersSlice } from "../../slices/healthyCenterSlice/healthyCenter.slice";

export const getAllHealthyCentersAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get("/healthy-center");
      dispatch(getAllHealthyCentersSlice(data?.response));
      return data;
    } catch (error) {
      return { error: error };
    }
  };
};

export const createHealthyCenterAction = async (dataForm) => {
  try {
    const { data } = await axiosClientAuth.post("/healthy-center", dataForm);
    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const deleteHealthyCenterAction = async (healthyCenterId) => {
  try {
    const { data } = await axiosClientAuth.delete(
      `/healthy-center/${healthyCenterId}`
    );
    return data;
  } catch (error) {
    return { error: error };
  }
};

export const updateHealthyCenterAction = async (healthyCenterId, dataForm) => {
  try {
    const data = await axiosClientAuth.put(
      `/healthy-center/${healthyCenterId}`,
      dataForm
    );
    return data;
  } catch (error) {
    return { error: error };
  }
};
