import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicalRecords: [],
};

const medicalRecordSlice = createSlice({
  name: "medicalRecord",
  initialState,
  reducers: {
    getAllMedicalRecordSlice: (state, action) => {
      state.medicalRecords = action.payload;
    },
  },
});

export const { getAllMedicalRecordSlice } = medicalRecordSlice.actions;
export default medicalRecordSlice.reducer;
