import styles from "./styles.module.css";

const { table, thead, tbody, trow, tcell } = styles;

const TableSkeleton = () => {
  return (
    <div className={table}>
      <div className={thead}>
        <div className={trow}>
          <div className={`${tcell} skeleton-shimmer`}></div>
          <div className={`${tcell} skeleton-shimmer`}></div>
          <div className={`${tcell} skeleton-shimmer`}></div>
        </div>
      </div>
      <div className={tbody}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className={trow}>
              <div className={`${tcell} skeleton-shimmer`}></div>
              <div className={`${tcell} skeleton-shimmer`}></div>
              <div className={`${tcell} skeleton-shimmer`}></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
