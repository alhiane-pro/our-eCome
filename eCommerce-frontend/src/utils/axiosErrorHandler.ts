import { isAxiosError } from "axios";

function axiosErrorHandler(error: unknown) {
  if (isAxiosError(error)) {
    return (
      error.response?.data || error.response?.data.message || error.message
    );
  }
  return "An unexpected error!";
}

export default axiosErrorHandler;
