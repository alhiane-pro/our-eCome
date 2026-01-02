import styles from "./styles.module.css";

const Table = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["table-wrapper"]}>{children}</div>;
};

export default Table;
