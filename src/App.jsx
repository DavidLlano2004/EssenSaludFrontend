import { useState } from "react";
import "./App.css";
import { useAuthInitializer } from "./hooks/useAuthInitializer";
import { HashRouter, Route, Routes } from "react-router-dom";
import { paths } from "./routes/paths";
import { TemplateAuth } from "./templates/TemplateAuth";
import { ProtectedRoute } from "./components/organims/protectedRoute/ProtectedRoute";
import { HomeApp } from "./pages/app/HomeApp/HomeApp";
import { TemplateApp } from "./templates/TemplateApp";
import { HealthyCenters } from "./pages/app/HealthyCenters/HealthyCenters";

function App() {
  useAuthInitializer();

  return (
    <HashRouter>
      <Routes>
        <Route path={paths.TEMPLATEAUTH} element={<TemplateAuth />} />
        <Route element={<ProtectedRoute />}>
          <Route path={paths.TEMPLATEAPP} element={<TemplateApp />}>
            <Route path={paths.HOME} element={<HomeApp />} />
            <Route path={paths.HEALTHYCENTER} element={<HealthyCenters />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
