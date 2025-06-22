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
              variants={variants}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white-custom w-[70%] flex flex-col px-2"
            >
              <div className="flex items-center justify-center gap-1 h-[80px] border-b border-gray-light-custom">
                <img className="w-8" src={IconWeb} alt="" />
                <h1 className=" text-xl text-primary font-semibold">
                  EssenSalud
                </h1>
              </div>
              <div className="w-[30%] h-[80px] flex flex-col absolute justify-center top-0 right-0 pl-3">
                <button
                  onClick={() => setViewMenuSm(false)}
                  className="w-10 h-10 bg-white grid place-items-center rounded-full"
                >
                  <img className="w-3" src={IconClose} alt="" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
