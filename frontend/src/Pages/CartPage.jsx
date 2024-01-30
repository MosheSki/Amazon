import { useContext } from "react";
import { Store } from "../Store";
import Title from "../Components/Shared/Title";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ItemsInCart from "../Components/CartPage/ItemsInCart";
import CheckOut from "../Components/CartPage/CheckOut";
import axios from "axios";
import { getError } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const { cart } = state;
  const { cartItems } = cart;

  const updateCartHandler = async (product, quantity) => {
    try {
      const { data } = await axios.get(`/api/v1/products/${product._id}`);

      if (data.countInStock < quantity) {
        alert("Sorry, Product is out of stock");
        return;
      }
      ctxDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    } catch (err) {
      // ctxDispatch({ type: GET_FAIL, payload: err.message });
      toast.error(getError(err));
    }
  };

  const removeCartHandler = async (product) => {
    ctxDispatch({ type: "REMOVE_PRODUCT", payload: product });
  };

  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Title title={"Shopping Cart"}></Title>
      <Row>
        <Col md={8}>
          <ItemsInCart
            cartItems={cartItems}
            updateCartHandler={updateCartHandler}
            removeCartHandler={removeCartHandler}
          />
        </Col>
        <Col md={4}>
          <CheckOut cartItems={cartItems} checkOutHandler={checkOutHandler} />
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
