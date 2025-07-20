import { paths } from "./paths";

export const rolePaths = {
  Administrativo: [paths.HOME, paths.HEALTHYCENTER, paths.APPOINTMENTSADMIN],
  Afiliado: [
    paths.HEALTHYPLANS,
    paths.APPOINTMENTSADMIN,
    paths.INVOICES,
    paths.PROFILE,
  ],
  Profesional: [paths.APPOINTMENTSADMIN, paths.PROFILE],
};
