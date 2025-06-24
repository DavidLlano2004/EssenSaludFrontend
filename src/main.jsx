import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { UIProvider } from "./context/UIContext.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<p>Cargando datos...</p>} persistor={persistor}>
          <UIProvider>
            <App />
          </UIProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
