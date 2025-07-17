import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  professional: {},
  professionalsData: [],
};

const professionalSlice = createSlice({
  name: "professionals",
  initialState,
  reducers: {
    getOneProfessionalSlice: (state, action) => {
      state.professional = action.payload;
    },
    getAllProfessionalsSlice: (state, action) => {
      state.professionalsData = action.payload;
    },
  },
});

export const { getOneProfessionalSlice , getAllProfessionalsSlice } = professionalSlice.actions;
export default professionalSlice.reducer;
