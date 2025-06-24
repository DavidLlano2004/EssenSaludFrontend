import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  healthyPlans: [],
};

const healthyPlanSlice = createSlice({
  name: "healthyCenter",
  initialState,
  reducers: {
    getAllHealthyPlansSlice: (state, action) => {
      state.healthyPlans = action.payload;
    },
  },
});

export const { getAllHealthyPlansSlice } = healthyPlanSlice.actions;
export default healthyPlanSlice.reducer;
