import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "../../../assets/icons/IconsProvider";
const { IconClose } = Icons;

export const Modal = ({
  children,
  isOpen,
  styleHW = "w-auto",
  paddingModal = "px-7 py-6",
  bgColorModal = "bg-white",
  closeModal,
  titleModal,
}) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`fixed inset-0 z-50 w-full shadow-md  rounded-md h-[100dvh] flex items-center justify-center bg-[#202020]/30 backdrop-blur-[1px] font-Sora`}
          >
            <motion.div
              initial={{ y: -900 }}
              animate={{ y: 0 }}
              exit={{ y: -900 }}
              transition={{ duration: 0.4 }}
              className={` ${styleHW} sm:mx-0 mx-2  ${bgColorModal} rounded-xl ${paddingModal}`}
            >
              <div className="flex justify-end">
                <div className="flex-1 flex items-center ">
                  <h1 className=" font-bold text-black-custom text-xl">
                    {titleModal}
                  </h1>
                </div>
                <div className="flex-1 place-items-end">
                  {closeModal && (
                    <button
                      onClick={closeModal}
                      className="w-9 h-9 hover:bg-[#f0f0f0] transition-all ease-in duration-200 border-gray-light-custom border rounded-full grid place-items-center cursor-pointer"
                    >
                      <img className="w-[10px]" src={IconClose} alt="" />
                    </button>
                  )}
                </div>
              </div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
