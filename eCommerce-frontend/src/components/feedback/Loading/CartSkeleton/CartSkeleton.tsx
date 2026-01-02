import styles from "./styles.module.css";

const {
  cartItemSkeleton,
  productSkeleton,
  productImgSkeleton,
  productInfoSkeleton,
  productTitleSkeleton,
  productPriceSkeleton,
  removeBtnSkeleton,
  cartItemSelectionSkeleton,
  quantitySkeleton,
  formSkeleton,
} = styles;

const CartSkeleton = () => {
  return Array(4)
    .fill(0)
    .map((_, index) => (
      <div className={`${cartItemSkeleton}`} key={index}>
        <div className={`${productSkeleton}`}>
          <div className={`${productImgSkeleton} skeleton-shimmer`}></div>
          <div className={productInfoSkeleton}>
            <div className={`${productTitleSkeleton} skeleton-shimmer`}></div>
            <div className={`${productPriceSkeleton} skeleton-shimmer`}></div>
            <div className={`${removeBtnSkeleton} skeleton-shimmer`}></div>
          </div>
        </div>
        <div className={`${cartItemSelectionSkeleton}`}>
          <div className={`${quantitySkeleton} skeleton-shimmer`}></div>
          <div className={`${formSkeleton} skeleton-shimmer`}></div>
        </div>
      </div>
    ));
};

export default CartSkeleton;
