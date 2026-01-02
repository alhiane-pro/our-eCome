const useCartItem = (
  changeQuantityHandler: (id: number, quantity: number) => void,
  deleteCartItemHandler: (id: number) => void
) => {
  const changeQuantity = (
    id: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    changeQuantityHandler(id, +event.target.value);
  };

  const deleteCartItem = (id: number) => {
    deleteCartItemHandler(id);
  };

  return { changeQuantity, deleteCartItem };
};

export default useCartItem;
