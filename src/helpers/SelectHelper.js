export const customStylesSelect = {
  option: (provided, state) => ({
    ...provided,
    padding: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    height: "30%",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }),
  control: (provided , state) => ({
    ...provided,
    width: "fit-content",
    padding: "0",
    border: state.isFocused
      ? "0px solid #2D3436" // <-- color en foco (azul en este ejemplo)
      : "1px solid #DADFE1",
    height: "50px",
    borderRadius: "16px",
    width: "100%",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    animation: "fadeIn 0.2s ease-in-out",
    "@keyframes fadeIn": {
      from: { opacity: 0, top: 0 },
      to: { opacity: 1, top: 4 },
    },
  }),
};

export const filterOptions = (candidate, input) => {
  const candidateLabel = candidate?.data?.label;
  const inputValue = input?.toLowerCase();

  if (typeof candidateLabel === "string") {
    return candidateLabel.toLowerCase().includes(inputValue);
  }

  return false;
};
