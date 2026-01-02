import { removeToast } from "@/store/toasts/toasts.slice";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";

const useToast = (id?: string) => {
  const dispatch = useAppDispatch();

  const totalWidth = 100; // The progress bar width is 400 pixels, representing 100% completion.
  const duration = 4000; // Total duration in milliseconds
  const intervalTime = duration / totalWidth; // Interval time in milliseconds
  const maxProgress = 100; // 100% completion

  const [progressBarIndicator, setProgressBarIndicator] = useState(0);
  const [pauseProgressBarIndicator, setPauseProgressBarIndicator] =
    useState(false);

  // remove toast handler
  const closeToastHandler = useCallback(() => {
    dispatch(removeToast(id));
  }, [id, dispatch]);

  //handle mouse hover over
  const handleMouseEvent = () => {
    setPauseProgressBarIndicator((prevState) => !prevState);
  };

  // progress bar indicator increment
  useEffect(() => {
    const timerId = setInterval(() => {
      setProgressBarIndicator((prevState) => {
        //if pause true stop incrementing progress
        if (!pauseProgressBarIndicator) {
          if (prevState < maxProgress) {
            return prevState + 1; //increase 1 pixel
          }
        }
        return prevState;
      });
    }, intervalTime);

    return () => clearInterval(timerId);
  }, [intervalTime, pauseProgressBarIndicator]);

  //close toast when progress bar is completed
  useEffect(() => {
    if (progressBarIndicator === 100) {
      closeToastHandler();
    }
  }, [progressBarIndicator, closeToastHandler]);

  return {
    handleMouseEvent,
    closeToastHandler,
    progressBarIndicator,
    intervalTime,
  };
};

export default useToast;
