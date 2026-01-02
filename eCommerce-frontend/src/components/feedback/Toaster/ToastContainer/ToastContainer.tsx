import { AnimatePresence, motion } from "motion/react";
import { useAppSelector } from "@/store/hooks";

import styles from "./styles.module.css";
import Toast from "../Toast/Toast";

interface ToastContainerProps {
  position:
    | "top-right"
    | "right-center"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | "left-center"
    | "top-left"
    | "top-center";
}

const ToastContainer = ({ position }: ToastContainerProps) => {
  const { toasts } = useAppSelector((state) => state.toasts);

  return (
    <div
      className={`${styles.toastContainer} ${styles[`position-${position}`]}`}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
          >
            <Toast
              id={toast.id}
              title={toast.title}
              type={toast.type}
              message={toast.message}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
