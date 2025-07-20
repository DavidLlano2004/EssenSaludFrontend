import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [],
  invoicesByUsers: [],
  invoiceTotalByUser: null,
};

const invoicesSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    getAllInvoicesSlice: (state, action) => {
      state.invoices = action.payload;
    },
    getAllInvoicesByUserSlice: (state, action) => {
      state.invoicesByUsers = action.payload;
    },
    getTotalInvoiceByUserSlice: (state, action) => {
      state.invoiceTotalByUser = action.payload;
    },
  },
});

export const {
  getAllInvoicesSlice,
  getAllInvoicesByUserSlice,
  getTotalInvoiceByUserSlice,
} = invoicesSlice.actions;
export default invoicesSlice.reducer;
