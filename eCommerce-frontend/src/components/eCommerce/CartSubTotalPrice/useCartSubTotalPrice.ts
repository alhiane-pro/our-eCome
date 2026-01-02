import { clearCartAfterPlacingOrder } from "@/store/cart/cart.slice";
import { placeOrder } from "@/store/orders/orders.slice";
import { useAppDispatch } from "@/store/hooks";
import type { IProduct } from "@/types";
import { useState } from "react";
import { addToast } from "@/store/toasts/toasts.slice";

const useCartSubTotalPrice = (products: IProduct[]) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const subTotal = products.reduce((acc, current) => {
    return acc + current.price * (current.quantity || 1);
  }, 0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handlePlacingOrder = () => {
    if (loading) return;

    setLoading(true);
    dispatch(placeOrder(subTotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterPlacingOrder());
      })
      .catch((error) => {
        dispatch(
          addToast({
            type: "danger",
            message: error,
          })
        );
      })
      .finally(() => {
        handleCloseModal();
        setLoading(false);
      });
  };

  return {
    showModal,
    handleCloseModal,
    subTotal,
    handlePlacingOrder,
    loading,
    handleShowModal,
  };
};

export default useCartSubTotalPrice;
