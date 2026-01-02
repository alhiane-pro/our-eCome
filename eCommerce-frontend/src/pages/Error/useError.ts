import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const useError = () => {
  // Accesses the error thrown during an action, loader, or component render to be used in a route module ErrorBoundary.
  const error = useRouteError();

  let errorStatus: number;
  let errorStatusText: string;

  // Check if the given error is an ErrorResponse generated from a Response thrown from an action or loader function.
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page Not Found!";
  }

  return { errorStatus, errorStatusText };
};

export default useError;
