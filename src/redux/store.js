import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice/Auth.Slice.js";
// import projectsReducer from "./slices/ProjectSlice/ProjectSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "articles"],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  //   projects: projectsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
