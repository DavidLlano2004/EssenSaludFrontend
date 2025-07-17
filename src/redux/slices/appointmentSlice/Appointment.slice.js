import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    getAllAppointmentsSlice: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export const { getAllAppointmentsSlice } = appointmentSlice.actions;
export default appointmentSlice.reducer;
