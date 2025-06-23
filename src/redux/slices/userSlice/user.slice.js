import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllUsersSlice: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { getAllUsersSlice } = userSlice.actions;
export default userSlice.reducer;
