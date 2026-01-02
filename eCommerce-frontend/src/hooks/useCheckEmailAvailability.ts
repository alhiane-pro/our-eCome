import type { TEmailStatus } from "@/types";
import { useState } from "react";

import axios from "axios";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TEmailStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnteredEmail(email);
    setEmailAvailabilityStatus("checking");
    try {
      const response = await axios.get(`/users?email=${email}`);
      if (response.data.length > 0) {
        setEmailAvailabilityStatus("notAvailable");
      } else {
        setEmailAvailabilityStatus("available");
      }
    } catch {
      setEmailAvailabilityStatus("failed");
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  };

  return {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};

export default useCheckEmailAvailability;
