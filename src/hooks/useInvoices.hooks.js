import { useDispatch } from "react-redux";
import {
  createInvoiceAction,
  deleteInvoiceAction,
  getAllInvoicesAction,
  getAllInvoicesByUserAction,
  getTotalInvoiceByUserAction,
  updateInvoiceAction,
} from "../redux/actions/invoicesAction/invoices.action";

export const useInvoices = () => {
  const dispatch = useDispatch();
  const createInvoiceFunction = async ({ dataForm }) => {
    try {
      const response = await createInvoiceAction(dataForm);

      if (!response || response?.error) {
        console.error("Error al crear la factura", response?.error);
        return { state: 500, error: response?.error };
      }

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };

  const getOneInvoiceDeleteFunction = async (affiliateId) => {
    try {
      const data = await dispatch(getAllInvoicesAction(affiliateId));
      if (data?.error) {
        console.error("Error al obtener las facturas:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };
  const getAllInvoicesByUserFunction = async (affiliateId) => {
    try {
      const data = await dispatch(getAllInvoicesByUserAction(affiliateId));
      if (data?.error) {
        console.error("Error al obtener las facturas:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };
  const getTotalInvoiceByUserFunction = async (affiliateId) => {
    try {
      const data = await dispatch(getTotalInvoiceByUserAction(affiliateId));
      if (data?.error) {
        console.error("Error al obtener el total:", data?.error);
        return { state: 500, error: data?.error };
      }
      return { state: 200 };
    } catch (error) {
      console.error("Error inesperado:", error);
      return { state: 500, error: error };
    }
  };

  const deleteInvoiceFunction = async (invoiceId) => {
    try {
      const response = await deleteInvoiceAction(invoiceId);

      if (response?.error) {
        console.error("Error al obtener factura:", response?.error);
        return { state: 500, error: response?.error };
      }

      return { state: 200 };
    } catch (error) {
      errorCatch(error);
    }
  };

  const updateInvoiceFunction = async ({
    idInvoice,
    dataForm,
    onStart = () => {},
    onSuccess = () => {},
  }) => {
    onStart();
    try {
      const response = await updateInvoiceAction(idInvoice, dataForm);
      if (!response || response?.error) {
        console.error("Error al editar la factura", response?.error);
        return { state: 500, error: response?.error };
      }
      onSuccess(response);

      return { state: 200, response };
    } catch (error) {
      return { state: 500, error };
    }
  };

  return {
    createInvoiceFunction,
    getOneInvoiceDeleteFunction,
    deleteInvoiceFunction,
    getAllInvoicesByUserFunction,
    getTotalInvoiceByUserFunction,
    updateInvoiceFunction
  };
};
