import { Navigate } from "react-router-dom";

import useCanActivate from "./useCanActivate";

const CanActivate = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useCanActivate();

  /**
   * Adding the replace prop to <Navigate /> is a best practice for auth guards
   * to ensure the "protected" page doesn't stay in the browser history after logout.
   */
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
};

export default CanActivate;
