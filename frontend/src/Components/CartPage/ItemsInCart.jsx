import PropTypes from "prop-types";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import MessageBox from "../Shared/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const ItemsInCart = ({ cartItems, updateCartHandler, removeCartHandler }) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your cart is empty. <Link to="/">Go back to home page.</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={8}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded img-thumbnail"
                  />
                  <Link to={`/products/${item.token}`}>{item.title}</Link>
                </Col>
                <Col md={2}>
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    name="minusButton"
                    disabled={item.quantity === 1}
                    variant="light"
                  >
                    <i className="fa fa-minus-circle"></i>
                  </Button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    name="plusButton"
                    variant="light"
                  >
                    <i className="fa fa-plus-circle"></i>
                  </Button>
                </Col>
                <Col md={1}>${item.price}</Col>
                <Col md={1}>
                  <Button
                    variant="light"
                    onClick={() => removeCartHandler(item)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
  removeCartHandler: PropTypes.func,
};

export default ItemsInCart;
