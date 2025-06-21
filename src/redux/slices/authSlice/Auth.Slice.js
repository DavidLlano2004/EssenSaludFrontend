import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  isLogged: false,
  rol: "",
  birthday: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginCase: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.rol = action.payload.rol;
      state.birthday = action.payload.birthday;
      state.userId = action.payload.id;
      state.isLogged = true;
    },
    singOffCase: (state) => {
      state.email = initialState.email;
      state.name = initialState.name;
      state.rol = initialState.rol;
      state.birthday = initialState.birthday;
      state.userId = initialState.userId;
      state.isLogged = false;
    },
  },
});

export const { loginCase, singOffCase } = authSlice.actions;
export default authSlice.reducer;
