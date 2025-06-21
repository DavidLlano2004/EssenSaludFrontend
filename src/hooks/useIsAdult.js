import { useMemo } from "react";

export const useIsAdult = (birthDateString) => {
  return useMemo(() => {
    if (!birthDateString) return false;

    const today = new Date();
    const birthDate = new Date(birthDateString);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--; // aún no ha cumplido los años este año
    }

    return age >= 18;
  }, [birthDateString]);
};
