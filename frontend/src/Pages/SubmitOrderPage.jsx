import { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";

const SubmitOrderPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, []);
  const submitOrderHandler = async () => {
    try {
      setLoading(true);
      //post req addOrder
      //delete cartItems from state and local storage
      //go to orderDetails page
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  cart.taxPrice = round2(cart.itemsPrice * 0.17);
  cart.shippingPrice =
    cart.itemsPrice > 50
      ? round2(cart.itemsPrice * 0.1)
      : round2(cart.itemsPrice * 0.02);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  return <div></div>;
};

export default SubmitOrderPage;
