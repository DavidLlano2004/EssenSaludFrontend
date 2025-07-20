import { axiosClientAuth } from "../../../config/AxiosClient";
import {
  getAllInvoicesByUserSlice,
  getAllInvoicesSlice,
  getTotalInvoiceByUserSlice,
} from "../../slices/invoicesSlice/invoice.slice";

export const createInvoiceAction = async (dataForm) => {
  try {
    const { data } = await axiosClientAuth.post("/invoice", dataForm);
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const updateInvoiceAction = async (idInvoice, dataForm) => {
  try {
    const { data } = await axiosClientAuth.put(
      `/invoice/${idInvoice}`,
      dataForm
    );
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};

export const getAllInvoicesAction = (affiliateId) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(`/invoice`);

      console.log("====================================");
      console.log(data);
      console.log("====================================");

      const endDataInvoices = data?.response?.filter(
        (invoice) => invoice?.affiliateId === affiliateId
      );

      console.log("====================================");
      console.log(endDataInvoices);
      console.log("====================================");

      dispatch(getAllInvoicesSlice(endDataInvoices[0]));

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};

export const getAllInvoicesByUserAction = (affiliateId) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(
        `/invoices-user/${affiliateId}`
      );

      console.log("====================================");
      console.log(data);
      console.log("====================================");

      dispatch(getAllInvoicesByUserSlice(data?.response));

      return data?.response;
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};

export const getTotalInvoiceByUserAction = (affiliateId) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosClientAuth.get(
        `/invoice-total/${affiliateId}`
      );
      console.log("====================================");
      console.log(data);
      console.log("====================================");

      dispatch(getTotalInvoiceByUserSlice(data?.totalPending));

      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error insperado");
    }
  };
};

export const deleteInvoiceAction = async (invoiceId) => {
  try {
    const { data } = await axiosClientAuth.delete(`/invoice/${invoiceId}`);
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    return data;
  } catch (error) {
    return { error: error };
  }
};
