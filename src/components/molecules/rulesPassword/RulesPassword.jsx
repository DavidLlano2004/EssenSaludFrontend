import React, { useEffect, useState } from "react";

export const RulesPassword = ({
  arrayRulesPassword,
  confirmPassword,
  password,
  setFlagCorrectPassword,
}) => {
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const validRulesCount = arrayRulesPassword.filter(
    (rule) => rule.valid
  ).length;

  // Definir colores según las reglas cumplidas
  const getBoxColors = () => {
    if (validRulesCount === 5)
      return ["bg-green-500", "bg-green-500", "bg-green-500", "bg-green-500"];
    if (validRulesCount === 4)
      return [
        "bg-yellow-400",
        "bg-yellow-400",
        "bg-yellow-400",
        "bg-[#c0c0c0]",
      ];
    if (validRulesCount === 3)
      return ["bg-orange-400", "bg-orange-400", "bg-[#c0c0c0]", "bg-[#c0c0c0]"];
    if (validRulesCount === 2)
      return ["bg-red-500", "bg-[#c0c0c0]", "bg-[#c0c0c0]", "bg-[#c0c0c0]"];
    return ["bg-[#c0c0c0]", "bg-[#c0c0c0]", "bg-[#c0c0c0]", "bg-[#c0c0c0]"]; // Estado inicial
  };

  useEffect(() => {
    if (validRulesCount === 5) {
      setIsCorrectPassword(true);
      setFlagCorrectPassword(true);
    } else {
      setIsCorrectPassword(false);
      setFlagCorrectPassword(false);
    }
  }, [validRulesCount, password, confirmPassword, setFlagCorrectPassword]);

  const boxColors = getBoxColors();

  return (
    <div className="h-1 w-auto flex flex-row">
      <div
        className={`h-full w-[45px] ${boxColors[0]} mr-1 rounded-tl-md rounded-bl-md transition-all`}
      />
      <div className={`h-full w-[45px] ${boxColors[1]} mr-1 transition-all`} />
      <div className={`h-full w-[45px] ${boxColors[2]} mr-1 transition-all`} />
      <div
        className={`h-full w-[45px] ${boxColors[3]} transition-all rounded-tr-md rounded-br-md`}
      />
    </div>
  );
};
