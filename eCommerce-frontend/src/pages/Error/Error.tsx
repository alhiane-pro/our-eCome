import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import styles from "./styles.module.css";
import useError from "./useError";

const { notFound, notFoundH1, notFoundP } = styles;

const Error = () => {
  const { errorStatus, errorStatusText } = useError();

  return (
    <Container className={notFound}>
      <div>
        <h1 className={notFoundH1}>{errorStatus}</h1>
        <p className={notFoundP}>{errorStatusText}</p>
        <Link to="/" replace={true}>
          How about going back to safety?
        </Link>
      </div>
    </Container>
  );
};

export default Error;
