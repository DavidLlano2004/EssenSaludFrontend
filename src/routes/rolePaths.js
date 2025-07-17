import { paths } from "./paths";

export const rolePaths = {
  Administrativo: [paths.HOME, paths.HEALTHYCENTER, paths.APPOINTMENTSADMIN],
  Afiliado: [paths.HEALTHYPLANS, paths.APPOINTMENTSAFFILIATES],
  Profesional: [paths.APPOINTMENTSPROFESSIONAL],
};
