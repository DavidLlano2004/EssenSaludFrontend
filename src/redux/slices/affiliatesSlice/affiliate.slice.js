import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  affiliate: {},
  affiliatesData: [],
  upcomingAppointments: [],
};

const affiliateSlice = createSlice({
  name: "affiliates",
  initialState,
  reducers: {
    getOneAffiliateSlice: (state, action) => {
      state.affiliate = action.payload;
    },
    getAllAffiliatesSlice: (state, action) => {
      state.affiliatesData = action.payload;
    },
    getUpcomingAppointmentsSlice: (state, action) => {
      state.upcomingAppointments = action.payload;
    },
  },
});

export const { getOneAffiliateSlice, getAllAffiliatesSlice , getUpcomingAppointmentsSlice } =
  affiliateSlice.actions;
export default affiliateSlice.reducer;
