import type { IToast } from "@/types";

import styles from "./styles.module.css";
import useToast from "./useToast";

const { toast } = styles;

const Toast = ({ id, type, title, message }: IToast) => {
  const {
    handleMouseEvent,
    closeToastHandler,
    progressBarIndicator,
    intervalTime,
  } = useToast(id);

  return (
    <div
      className={`alert ${`alert-${type}`} ${toast} mb-0`}
      onMouseEnter={handleMouseEvent}
      onMouseLeave={handleMouseEvent}
    >
      <h5>{title ? title : type}</h5>
      <p>{message}</p>
      <button type="button" className="btn-close" onClick={closeToastHandler} />
      <span
        className="placeholder"
        style={{
          width: `${progressBarIndicator}%`,
          transition: `width ${intervalTime}ms linear`,
        }}
      ></span>
    </div>
  );
};

export default Toast;
