import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getOrders,
  resetPlacingOrderStatus,
} from "@/store/orders/orders.slice";
import { useEffect, useState } from "react";
import type { IProduct } from "@/types";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const { loading, error, ordersList } = useAppSelector(
    (state) => state.orders
  );

  const [showModal, setShowModal] = useState(false);
  const [orderItems, setOrderItems] = useState<IProduct[]>([]);

  const viewDetailsHandler = (orderId: number) => {
    const orderItems = ordersList.find(
      (order) => order.id === orderId
    )?.orderItems;

    setShowModal(true);
    setOrderItems((prev) => [...prev, ...(orderItems ?? [])]);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setOrderItems([]);
  };

  useEffect(() => {
    const promise = dispatch(getOrders());

    return () => {
      promise.abort();
      dispatch(resetPlacingOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    ordersList,
    showModal,
    orderItems,
    viewDetailsHandler,
    closeModalHandler,
  };
};

export default useOrders;
