import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconWeb, IconClose } = Icons;

export const MenuSm = ({ isopenModal, setViewMenuSm }) => {
  const variants = {
    enter: () => ({
      x: -400, // Entra desde el lado indicado
    }),
    center: {
      x: 0, // Posición actual
    },
    exit: () => ({
      x: -400, // Sale hacia el lado indicado
    }),
  };
  return (
    <AnimatePresence>
      {isopenModal && (
        <>
          <motion.div
            onClick={() => setViewMenuSm(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full fixed inset-0 bg-[#202020]/30 backdrop-blur-[1px] h-[100dvh] z-50 flex flex-row justify-start"
          >
            <motion.div
              initial="enter"
              animate="center"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white-custom w-[70%] flex flex-col px-2"
            >
              <div className="flex items-center justify-center gap-1 h-[80px] border-b border-gray-light-custom">
                <img className="w-6" src={IconWeb} alt="" />
                <h1 className=" text-lg text-primary font-semibold">
                  EssenSalud
                </h1>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
