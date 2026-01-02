import { Button, Modal, Spinner } from "react-bootstrap";
import type { IProduct } from "@/types";

import styles from "./styles.module.css";
import useCartSubTotalPrice from "./useCartSubTotalPrice";

interface CartSubTotalPriceProps {
  products: IProduct[];
  accessToken: string | null;
}

const CartSubTotalPrice = ({
  products,
  accessToken,
}: CartSubTotalPriceProps) => {
  const {
    showModal,
    handleCloseModal,
    subTotal,
    handlePlacingOrder,
    loading,
    handleShowModal,
  } = useCartSubTotalPrice(products);

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subTotal: $
          {subTotal.toFixed(2)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={handlePlacingOrder}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>${subTotal.toFixed(2)}</span>
      </div>
      {accessToken && (
        <div className={styles.container}>
          <span></span>
          <Button
            variant={"info"}
            style={{ color: "white" }}
            onClick={handleShowModal}
          >
            Place Order
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubTotalPrice;
