import { createContext, useContext, useMemo, useState } from "react";

const UIContext = createContext();

export const UIProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
    };
  }, [isLoading]);

  return <UIContext.Provider value={value} {...props} />;
};

export const useUIContext = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("Este hook debe de estar dentro del provedor Api");
  }

  return context;
};
