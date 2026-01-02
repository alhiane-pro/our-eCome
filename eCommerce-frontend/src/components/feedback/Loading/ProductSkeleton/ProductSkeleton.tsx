import { Col, Row } from "react-bootstrap";

import styles from "./styles.module.css";

const {
  productSkeleton,
  productImgSkeleton,
  productTitleSkeleton,
  productPriceSkeleton,
  maximumNoticeSkeleton,
  addToCartBtnSkeleton,
} = styles;

const ProductSkeleton = () => {
  const skeleton = Array(4)
    .fill(0)
    .map((_, index) => (
      <Col
        key={index}
        xs={6}
        md={3}
        className="d-flex justify-content-center mb-5 mt-2"
      >
        <div className={`${productSkeleton}`}>
          <div className={`${productImgSkeleton} skeleton-shimmer`}></div>
          <div className={`${productTitleSkeleton} skeleton-shimmer`}></div>
          <div className={`${productPriceSkeleton} skeleton-shimmer`}></div>
          <div className={`${maximumNoticeSkeleton} skeleton-shimmer`}></div>
          <div className={`${addToCartBtnSkeleton} skeleton-shimmer`}></div>
        </div>
      </Col>
    ));
  return <Row>{skeleton}</Row>;
};

export default ProductSkeleton;
