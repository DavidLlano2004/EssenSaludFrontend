import React from "react";

export const AlertValidations = ({
  title = "¡Ups!",
  message,
  type = "warning", // Tipo de alerta (success, error, warning, info)
  widthAlert = "w-full",
  closeAlert
}) => {
  // Estilos dinámicos según el tipo de alerta
  const containerStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red_100 border-red-500 text-red-700",
    warning: "bg-orange-100 border-orange-500 text-orange-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  // Determinar el estilo según el tipo recibido
  const selectedStyle = containerStyles[type] || containerStyles.warning;

  return (
    <div
      className={`${widthAlert} border-l-4 flex  justify-between p-4 ${selectedStyle}`}
    >
      <div>
        <p className="font-bold">{title}</p>
        <div className="flex gap-2">
          <p>{message}.</p>
          {/* <button className="underline">Ir a crear datos</button> */}
        </div>
      </div>
      <button onClick={closeAlert}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentcolor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
