import { Heading, Table } from "@/components/common";
import { Loading, LottieHandler } from "@/components/feedback";
import { Modal } from "react-bootstrap";

import ProductInfo from "@/components/eCommerce/ProductInfo/ProductInfo";
import useOrders from "./useOrders";

const Orders = () => {
  const {
    loading,
    error,
    ordersList,
    showModal,
    orderItems,
    viewDetailsHandler,
    closeModalHandler,
  } = useOrders();

  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderItems.map((orderItem) => (
            <ProductInfo
              key={orderItem.id}
              title={orderItem.title}
              img={orderItem.img}
              price={orderItem.price}
              quantity={orderItem.quantity}
              direction="row"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="My Orders" />
      <Loading status={loading} error={error} type="table">
        {ordersList.length > 0 ? (
          <Table>
            <table>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Order Items</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((el) => (
                  <tr key={el.id}>
                    <td data-label={"Order Number"}>#{el.id}</td>
                    <td data-label={"Order Items"}>
                      {el.orderItems.length} item(s)
                      {" / "}
                      <span
                        onClick={() => viewDetailsHandler(el.id)}
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Product Details
                      </span>
                    </td>
                    <td data-label={"Total Price"}>{el.subTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Table>
        ) : (
          <LottieHandler
            type="empty"
            title="Sorry, You have no orders to show!"
            message="There is no orders to show."
            className="text-info"
          />
        )}
      </Loading>
    </>
  );
};

export default Orders;
