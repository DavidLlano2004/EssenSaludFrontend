import { useDispatch, useSelector } from "react-redux";
import {
  createAffiliateAction,
  getInfoAffiliateAction,
} from "../redux/actions/affiliatesAction/affiliates.action";
import { useUsers } from "./useUsers.hooks";

export const useAffiliate = () => {
  const { updateUserFunction } = useUsers();
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const createAffiliateFunction = async ({
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();

    try {
      const response = await createAffiliateAction(dataForm);

      if (!response || response?.error) {
        console.error("Error al crear el centro", response?.error);
        return { state: 500, error: response?.error };
      }

      const userId = dataForm?.userId;

      const responseUpdateState = await updateUserFunction({
        userId,
        dataForm: { state: true },
      });

      if (!responseUpdateState || responseUpdateState?.error) {
        console.error(
          "Error al actualizar estado de usuario",
          responseUpdateState?.error
        );
        return { state: 500, error: responseUpdateState?.error };
      }

      onSuccess(responseUpdateState);

      return { state: 200, responseUpdateState };
    } catch (error) {
      return { state: 500, error };
    }
  };

  const getOneAffiliateFunction = async () => {
    try {
      const data = await dispatch(getInfoAffiliateAction(userId));
      if (data?.error) {
        console.error("Error al obtener el afiliado:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };

  return {
    createAffiliateFunction,
    getOneAffiliateFunction,
  };
};
