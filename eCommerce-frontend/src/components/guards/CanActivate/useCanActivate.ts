import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToast } from "@/store/toasts/toasts.slice";
import { useEffect } from "react";

const useCanActivate = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) {
      dispatch(
        addToast({
          type: "warning",
          message: "You've been logged out, please login",
        })
      );
    }
  }, [accessToken, dispatch]);

  return { accessToken };
};

export default useCanActivate;
