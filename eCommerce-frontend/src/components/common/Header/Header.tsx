import { Container } from "react-bootstrap";

import Wishlist from "@/assets/svg/wishlist.svg?react";
import HeaderRight from "./HeaderRight/HeaderRight";
import Cart from "@/assets/svg/cart.svg?react";
import styles from "./styles.module.css";
import useHeader from "./useHeader";

const { headerContainer, headerRow, headerLogo, headerRightBar } = styles;

const Header = () => {
  const { cartTotalQuantity, wishlistTotalQuantity } = useHeader();

  return (
    <header className={headerContainer}>
      <Container className={headerRow}>
        <h1 className={headerLogo}>
          <span>Our</span> <span className={`text-info`}>eCom</span>
        </h1>
        <div className={headerRightBar}>
          <HeaderRight
            to="/wishlist"
            svgIcon={<Wishlist title="Header Wishlist" />}
            totalQuantity={wishlistTotalQuantity}
            title="Wishlist"
          />
          <HeaderRight
            to="/cart"
            svgIcon={<Cart title="Header Cart" />}
            totalQuantity={cartTotalQuantity}
            title="Cart"
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
