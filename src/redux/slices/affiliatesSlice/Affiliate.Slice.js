import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  affiliate: {},
};

const affiliateSlice = createSlice({
  name: "affiliates",
  initialState,
  reducers: {
    getOneAffiliateSlice: (state, action) => {
      state.affiliate = action.payload;
    },
  },
});

export const { getOneAffiliateSlice } = affiliateSlice.actions;
export default affiliateSlice.reducer;
