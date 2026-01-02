import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth/auth.slice";
import { useState } from "react";

const useNavbar = () => {
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const toggleNavbar = () => {
    setExpanded((prev) => !prev);
  };

  const closeNavbar = () => {
    if (expanded) setExpanded(false);
  };

  const logoutHandler = () => {
    closeNavbar();
    dispatch(logout());
  };

  return {
    expanded,
    toggleNavbar,
    closeNavbar,
    accessToken,
    user,
    logoutHandler,
  };
};

export default useNavbar;
