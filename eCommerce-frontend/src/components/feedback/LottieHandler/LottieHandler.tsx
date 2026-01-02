import Ordered from "@/assets/svg/ordered.svg?react";
import Loader from "@/assets/svg/loader.svg?react";
import Empty from "@/assets/svg/empty.svg?react";
import Error from "@/assets/svg/error.svg?react";

const lottieSvgsMap = {
  empty: Empty,
  error: Error,
  loading: Loader,
  ordered: Ordered,
};

interface LottieHandlerProps {
  type: keyof typeof lottieSvgsMap;
  title: string;
  message: string;
  className: string;
}

const LottieHandler = ({
  type,
  title,
  message,
  className,
}: LottieHandlerProps) => {
  const Lottie = lottieSvgsMap[type];
  return (
    <div className="text-center pt-4 pb-4">
      <Lottie width={150} height={150} title={title} />
      <h3 className={className} style={{ fontSize: "19px" }}>
        {message}
      </h3>
    </div>
  );
};

export default LottieHandler;
