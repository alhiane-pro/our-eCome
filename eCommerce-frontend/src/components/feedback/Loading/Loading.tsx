import type { TLoading } from "@/types";

import CategorySkeleton from "./CategorySkeleton/CategorySkeleton";
import ProductSkeleton from "./ProductSkeleton/ProductSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";
import TableSkeleton from "./TableSkeleton/TableSkeleton";
import CartSkeleton from "./CartSkeleton/CartSkeleton";

const skeletonsTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  table: TableSkeleton,
  cart: CartSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type: keyof typeof skeletonsTypes;
};

const Loading = ({ status, error, children, type }: LoadingProps) => {
  const Component = skeletonsTypes[type];

  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return (
      <LottieHandler
        type="error"
        title={"Error"}
        message={error!}
        className="text-danger mt-3"
      />
    );
  }
  return <>{children}</>;
};

export default Loading;
