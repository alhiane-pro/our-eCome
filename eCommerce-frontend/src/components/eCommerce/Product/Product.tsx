import { Button, Modal, Spinner } from "react-bootstrap";
import type { IProduct } from "@/types";
import { memo } from "react";

import ProductInfo from "../ProductInfo/ProductInfo";
import LikeFill from "@/assets/svg/like-fill.svg?react";
import Like from "@/assets/svg/like.svg?react";
import styles from "./styles.module.css";
import useProduct from "./useProduct";

const { maximumNotice, wishlistBtn } = styles;

// Encapsulated Component => Reusable
const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: IProduct) => {
    const {
      toggleLikeHandler,
      isLoading,
      quantityReachedToMax,
      remainingQuantity,
      addToCartHandler,
      isBtnDisabled,
      show,
      handleCloseModal,
    } = useProduct(max, quantity, isAuthenticated);

    return (
      <>
        <Modal show={show} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist!
          </Modal.Body>
        </Modal>
        <ProductInfo img={img} title={title} price={price} direction="column">
          <div className={wishlistBtn} onClick={() => toggleLikeHandler(id!)}>
            {isLoading ? (
              <Spinner
                animation="border"
                variant="danger"
                role="status"
                size="sm"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You reach to the limit"
              : `You can add ${remainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={() => addToCartHandler(id!)}
            disabled={isBtnDisabled || quantityReachedToMax}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>{" "}
                Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
