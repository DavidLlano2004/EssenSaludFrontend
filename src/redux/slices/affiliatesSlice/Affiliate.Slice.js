import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  affiliate: {},
  affiliatesData: [],
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
  },
});

export const { getOneAffiliateSlice , getAllAffiliatesSlice } = affiliateSlice.actions;
export default affiliateSlice.reducer;
