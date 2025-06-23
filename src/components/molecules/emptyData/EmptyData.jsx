import { motion } from "framer-motion";
import React from "react";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconEmptyBlue } = Icons;
export const EmptyData = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className="flex flex-col items-center gap-3"
    >
      <img className="w-14" src={IconEmptyBlue} alt="" />
      <h1 className="text-base text-primary font-semibold">Aún no hay datos</h1>
    </motion.div>
  );
};
