import { Link } from "react-router-dom";

import useHeaderRight from "./useHeaderRight";
import styles from "./styles.module.css";

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

interface HeaderRightProps {
  to: "/cart" | "/wishlist";
  svgIcon: React.ReactNode;
  totalQuantity: number;
  title: "Cart" | "Wishlist";
}

const HeaderRight = ({
  to,
  svgIcon,
  totalQuantity,
  title,
}: HeaderRightProps) => {
  const { isAnimate } = useHeaderRight(totalQuantity);

  return (
    <Link className={container} to={to}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div
            data-testid="totalQuantity"
            className={`${totalNum} ${isAnimate ? pumpAnimate : ""}`}
          >
            {totalQuantity}
          </div>
        )}
      </div>
      <h3>{title}</h3>
    </Link>
  );
};

export default HeaderRight;
