import { Suspense } from "react";

import LottieHandler from "../LottieHandler/LottieHandler";

const SuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler
          type="loading"
          title="Loading..."
          message="Loading please wait..."
          className="text-info"
        />
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
