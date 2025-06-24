import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  healthyCenters: [],
};

const healthyCenterSlice = createSlice({
  name: "healthyCenter",
  initialState,
  reducers: {
    getAllHealthyCentersSlice: (state, action) => {
      state.healthyCenters = action.payload;
    },
  },
});

export const { getAllHealthyCentersSlice } = healthyCenterSlice.actions;
export default healthyCenterSlice.reducer;
