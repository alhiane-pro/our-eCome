import { getCategories } from "@/store/categories/categories.slice";
import { productsCleanUp } from "@/store/products/products.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const useCategories = () => {
  const dispatch = useAppDispatch();

  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  /**
   * to cancel your running thunk before it has finished,
   * we can use the abort method of the promise returned by dispatch.
   */
  useEffect(() => {
    const promise = dispatch(getCategories());
    return () => {
      promise?.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch]);

  return { loading, error, records };
};

export default useCategories;
