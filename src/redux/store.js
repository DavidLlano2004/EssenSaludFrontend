import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice/Auth.Slice.js";
import userReducer from "./slices/userSlice/user.slice.js";
import healthyCenterReducer from "./slices/healthyCenterSlice/healthyCenter.slice.js";
import healthyPlanReducer from "./slices/healthyPlansSlice/healthyPlans.slice.js";
import affiliatesReducer from "./slices/affiliatesSlice/Affiliate.Slice.js";
import professionalsReducer from "./slices/professinalSlice/Professional.Slice.js";
import appointmentReducer from "./slices/appointmentSlice/Appointment.slice.js";
import recordReducer from "./slices/medicalRecordSlice/MedicalRecord.slice.js";
import invoiceReducer from "./slices/invoicesSlice/Invoice.slice.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "user",
    "healthyCenter",
    "affiliates",
    "professionals",
    "appointment",
    "medicalRecord"
  ],
};

export const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  healthyCenter: healthyCenterReducer,
  healthyPlan: healthyPlanReducer,
  affiliates: affiliatesReducer,
  professionals: professionalsReducer,
  appointment: appointmentReducer,
  medicalRecord: recordReducer,
  invoice: invoiceReducer,
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
      thunk: true,
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/PURGE"],
      },
    }),
});

export const persistor = persistStore(store);
