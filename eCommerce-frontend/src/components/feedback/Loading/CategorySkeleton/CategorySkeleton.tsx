import { Row, Col } from "react-bootstrap";

import styles from "./styles.module.css";

const { categorySkeleton, categoryImgSkeleton, categoryTitleSkeleton } = styles;

const CategorySkeleton = () => {
  const renderList = Array(4)
    .fill(0)
    .map((_, index) => (
      <Col
        key={index}
        xs={6}
        md={3}
        className="d-flex justify-content-center mb-5 mt-2"
      >
        <div className={categorySkeleton}>
          <div className={`${categoryImgSkeleton} skeleton-shimmer`}></div>
          <div className={`${categoryTitleSkeleton} skeleton-shimmer`}></div>
        </div>
      </Col>
    ));
  return <Row>{renderList}</Row>;
};

export default CategorySkeleton;
