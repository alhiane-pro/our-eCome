import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

import Wishlist from "@/assets/svg/wishlist.svg?react";
import styles from "./styles.module.css";

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderWishlist = () => {
  const navigate = useNavigate();

  const totalQuantity = useAppSelector(
    (state) => state.wishlist.wishlistItems.length
  );

  // useEffect(() => {
  //   setIsAnimate((prev) => !prev);
  //   setTimeout(() => {
  //     setIsAnimate((prev) => !prev);
  //   }, 300);
  // }, [totalQuantity]);

  // 1. The "Key" Trick
  /**
   * Instead of manually toggling a boolean state,
   * you can force the element to re-mount or re-start its animation
   * by using a key that changes when the quantity changes.
   * This avoids useEffect and useState for the animation entirely.
   */

  return (
    <div className={container} onClick={() => navigate("/wishlist")}>
      <div className={iconWrapper}>
        <Wishlist title="Header Wishlist" />
        {totalQuantity > 0 && (
          <div key={totalQuantity} className={`${totalNum} ${pumpAnimate}`}>
            {totalQuantity}
          </div>
        )}
      </div>
      <h3>Wishlist</h3>
    </div>
  );
};

export default HeaderWishlist;
