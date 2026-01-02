import { toggleLike } from "@/store/wishlish/wishlist.slice";
import { addToCart } from "@/store/cart/cart.slice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";

const useProduct = (
  max: number,
  quantity: number | undefined,
  isAuthenticated: boolean | undefined
) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();

  const remainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = remainingQuantity === 0 ? true : false;

  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const addToCartHandler = (id: number) => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

  const toggleLikeHandler = (id: number) => {
    if (isAuthenticated) {
      if (isLoading) return;

      setIsLoading(true);

      dispatch(toggleLike(id))
        .unwrap()
        .then((payload) => {
          console.log(payload);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      handleShowModal();
    }
  };

  useEffect(() => {
    if (!isBtnDisabled) return;

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  return {
    quantityReachedToMax,
    remainingQuantity,
    toggleLikeHandler,
    addToCartHandler,
    handleCloseModal,
    handleShowModal,
    isBtnDisabled,
    isLoading,
    show,
  };
};

export default useProduct;
