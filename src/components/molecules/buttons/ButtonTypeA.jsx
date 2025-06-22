import React, { useState } from "react";

export const ButtonTypeA = ({
  action = null,
  bdColor = "border border-primary-red_1",
  bdType = "solid",
  bdWidth = "1px",
  bgColor = "bg-[#ffffff]",
  bgHvColor = "#FFFFFF",
  centrado = false,
  styles = "",
  submitBtn = false,
  text = "",
  txColor = "#627173",
  idButton,
  alternativeStyle = " text-sm xl:text-base text-center",
  width = "w-[40%]",
  img,
  link,
  dataTestId = "button_type_a",
  disabled,
  imgStyles,
  loading = false,
  paddingButton = "5px",
  heigthButton
}) => {
  const buttonStyle = {
    border: `${bdWidth} ${bdType}`,
    padding: paddingButton,
    borderRadius: "16px",
    fontWeight: "normal",
    margin: centrado ? "0 auto" : "inehirt",
    ...styles,
    idButton,
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const Tag = link ? "a" : "button";
  const extraProps = link
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { type: submitBtn ? "submit" : "button" };

  return (
    <Tag
      id={idButton}
      disabled={disabled}
      data-testid={dataTestId}
      className={`ButtonTypeA transition duration-300 ease-in ${heigthButton} ${txColor} ${bdColor} ${bgColor} ${alternativeStyle} ${bgHvColor} ${width}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isHovered ? { ...buttonStyle } : buttonStyle}
      onClick={!link ? action : undefined}
      {...extraProps}
    >
      {img && <img src={img} alt="icono" className={`${imgStyles}`} />}

      {!loading && text}
      {loading && (
        <div className="w-6 h-6 border-2 border-t-white border-[#b4c2dd] rounded-full animate-spin"></div>
      )}
    </Tag>
  );
};
