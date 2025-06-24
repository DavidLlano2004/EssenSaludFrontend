import { axiosClientAuth } from "../../../config/AxiosClient";
import { getAllUsersSlice } from "../../slices/userSlice/user.slice";

export const getAllUsersAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/profiles`);
      dispatch(getAllUsersSlice(data?.response));
      return data;
    } catch (error) {
      return { error: error };
    }
  };
};

export const deleteUserAction = async (userId) => {
  try {
    const { data } = await axiosClientAuth.delete(`/profile/${userId}`);
    return data;
  } catch (error) {
    return { error: error };
  }
};

export const updateUserAction = async (userId, dataForm) => {
  try {
    const { data } = await axiosClientAuth.put(`/profile/${userId}`, dataForm);
    return data;
  } catch (error) {
    return { error: error };
  }
};
