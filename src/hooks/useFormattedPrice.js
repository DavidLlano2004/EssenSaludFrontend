import { useMemo } from "react";

export const useFormattedPrice = (price) => {
  const formattedPrice = useMemo(() => {
    if (price == null || isNaN(price)) return "0";
    
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, [price]);

  return formattedPrice;
};
