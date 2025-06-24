import { createAffiliateAction } from "../redux/actions/affiliatesAction/affiliates.action";

export const useAffiliate = () => {
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

      onSuccess(response);

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };
  return {
    createAffiliateFunction,
  };
};
