export const formatPrice = (price) => {
  if (price == null || isNaN(price)) return "0";

  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};