import { axiosClientAuth } from "../../../config/AxiosClient";
import { getAllUsersSlice } from "../../slices/userSlice/user.slice";

// Obtener todos los usuarios
export const getAllUsersAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/profiles`); // GET /api/profiles
      dispatch(getAllUsersSlice(data?.response));
      return data;
    } catch (error) {
      return { error: error };
    }
  };
};

// Eliminar usuario
export const deleteUserAction = async (userId) => {
  try {
    const { data } = await axiosClientAuth.delete(`/profile/${userId}`); // DELETE /api/profile/:id
    return data;
  } catch (error) {
    return { error: error };
  }
};

// Actualizar usuario
export const updateUserAction = async (userId, dataForm) => {
  try {
    const { data } = await axiosClientAuth.put(`/profile/${userId}`, dataForm); // PUT /api/profile/:id
    return data;
  } catch (error) {
    return { error: error };
  }
};
