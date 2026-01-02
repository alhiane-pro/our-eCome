import { getCartTotalQuantitySelector } from "@/store/cart/cart.slice";
import { useEffect, useEffectEvent, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

import Basket from "@/assets/svg/cart.svg?react";
import styles from "./styles.module.css";

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderBasket = () => {
  const navigate = useNavigate();

  const [isAnimate, setIsAnimate] = useState(false);

  // const totalQuantity = useAppSelector((state) => {
  //   return Object.values(state.cart.cartItems).reduce((acc, current) => {
  //     return acc + current;
  //   }, 0);
  // });

  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  // useEffect(() => {
  //   setIsAnimate((prev) => !prev);
  //   setTimeout(() => {
  //     setIsAnimate((prev) => !prev);
  //   }, 300);
  // }, [totalQuantity]);

  // 2. Use useEffectEvent
  // This logic is "non-reactive" — it won't cause the Effect to re-run
  const triggerAnimation = useEffectEvent(() => {
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  });

  // Use the Effect Event inside useEffect
  useEffect(() => {
    // This effect ONLY re-runs when totalQuantity changes
    if (totalQuantity > 0) triggerAnimation();
  }, [totalQuantity]); // triggerAnimation is omitted from dependencies

  /**
   * If you are using React 19.2+, you can use the new useEffectEvent hook to wrap the logic.
   * This allows you to read values without making them reactive dependencies (isAnimate),
   * which helps in more complex synchronization scenarios.
   */

  return (
    <div className={container} onClick={() => navigate("/cart")}>
      <div className={iconWrapper}>
        <Basket title="Header Basket" />
        {totalQuantity > 0 && (
          <div className={`${totalNum} ${isAnimate ? pumpAnimate : ""}`}>
            {totalQuantity}
          </div>
        )}
      </div>
      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket;
