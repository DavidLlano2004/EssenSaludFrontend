import { useState } from "react";
import "./App.css";
import { useAuthInitializer } from "./hooks/useAuthInitializer";
import { HashRouter, Route, Routes, BrowserRouter } from "react-router-dom";
import { paths } from "./routes/paths";
import { TemplateAuth } from "./templates/TemplateAuth";
import { ProtectedRoute } from "./components/organims/protectedRoute/ProtectedRoute";
import { HomeApp } from "./pages/app/HomeApp/HomeApp";
import { TemplateApp } from "./templates/TemplateApp";
import { HealthyCenters } from "./pages/app/HealthyCenters/HealthyCenters";
import { HealthyPlans } from "./pages/app/HealthyPlans/HealthyPlans";
import { ProtectedRouteByRole } from "./components/organims/protectedRoute/ProtectedRouteByRole";
import { RedirectByRole } from "./components/organims/protectedRoute/RedirectByRole";
import AppointmentsAdmin from "./pages/app/Appointments/AppointmentsAdmin";
import Invoices from "./pages/app/Invoices/Invoices";
import ProfileUser from "./pages/app/ProfileUser/ProfileUser";

function App() {
  useAuthInitializer();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.TEMPLATEAUTH} element={<TemplateAuth />} />

        <Route element={<ProtectedRoute />}>
          <Route path={paths.TEMPLATEAPP} element={<TemplateApp />}>
            <Route index element={<RedirectByRole />} />
            <Route element={<ProtectedRouteByRole />}>
              <Route path={paths.HOME} element={<HomeApp />} />
              <Route path={paths.HEALTHYCENTER} element={<HealthyCenters />} />
              <Route path={paths.HEALTHYPLANS} element={<HealthyPlans />} />
              <Route
                path={paths.APPOINTMENTSADMIN}
                element={<AppointmentsAdmin />}
              />
              <Route path={paths.INVOICES} element={<Invoices />} />
              <Route path={paths.PROFILE} element={<ProfileUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
