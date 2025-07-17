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
import { HealthyPlans } from "./pages/app/HealthyPlans/HealthyPlans";
import { ProtectedRouteByRole } from "./components/organims/protectedRoute/ProtectedRouteByRole";
import { RedirectByRole } from "./components/organims/protectedRoute/RedirectByRole";
import { AppointmentsProfessional } from "./pages/app/Appointments/AppointmentsProfessional";
import { AppointmentsAffiliates } from "./pages/app/Appointments/AppointmentsAffiliates";
import AppointmentsAdmin from "./pages/app/Appointments/AppointmentsAdmin";

function App() {
  useAuthInitializer();

  return (
    <HashRouter>
      <Routes>
        <Route path={paths.TEMPLATEAUTH} element={<TemplateAuth />} />

        <Route element={<ProtectedRoute />}>
          <Route path={paths.TEMPLATEAPP} element={<TemplateApp />}>
            <Route index element={<RedirectByRole />} />
            <Route element={<ProtectedRouteByRole />}>
              <Route path={paths.HOME} element={<HomeApp />} />
              <Route path={paths.HEALTHYCENTER} element={<HealthyCenters />} />
              <Route path={paths.HEALTHYPLANS} element={<HealthyPlans />} />
              <Route path={paths.APPOINTMENTSPROFESSIONAL} element={<AppointmentsProfessional />} />
              <Route path={paths.APPOINTMENTSAFFILIATES} element={<AppointmentsAffiliates />} />
              <Route path={paths.APPOINTMENTSADMIN} element={<AppointmentsAdmin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
