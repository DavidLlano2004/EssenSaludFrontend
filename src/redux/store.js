import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice/Auth.Slice.js";
import userReducer from "./slices/userSlice/user.slice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"],
};

export const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    storage.removeItem("persist:root"); // borra el localStorage persistido
    state = undefined; // limpia el state actual
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST" , "persist/PURGE"],
      },
    }),
});

export const persistor = persistStore(store);
