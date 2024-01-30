import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";

const CheckOut = ({ cartItems, checkOutHandler }) => {
  return (
    <Card>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>
            <h3>
              Subtotal{" ("}
              {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
              {cartItems.length === 1 ? "Item): " : "Items): "}$
              {cartItems
                .reduce((a, c) => a + c.quantity * c.price, 0)
                .toFixed(2)}
            </h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-grid">
              <Button
                type="button"
                disabled={cartItems.length === 0}
                variant="primary"
                onClick={() => checkOutHandler()}
              >
                Check Out
              </Button>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

CheckOut.propTypes = {
  cartItems: PropTypes.array,
  checkOutHandler: PropTypes.func,
};
export default CheckOut;
