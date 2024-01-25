import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store.jsx";
import axios from "axios";
import descriptionReducer from "../Reducers/descriptionReducer.jsx";
import { addToCartHandler, getError } from "../utils";
import Loading from "../Components/Shared/Loading.jsx";
import MessageBox from "../Components/Shared/MessageBox.jsx";
import ProductDescription from "../components/DescriptionPage/ProductDescription";
import CartDescription from "../components/DescriptionPage/CartDescription";
import Title from "../Components/Shared/Title.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const initialState = { loading: true, error: "", data: [] };

const DescriptionPage = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    descriptionReducer,
    initialState
  );
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const { data } = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: "GET_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "GET_FAIL", payload: getError(error) });
      }
    };
    getProduct();
  }, [token]);
  const addToCart = async () => {
    await addToCartHandler(data, cartItems, ctxDispatch);
    navigate("/cart");
  };

  return (
    <div>
      <Title title={data.title} />
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img width={400} src={data.image} alt={data.title} />
            </Col>
            <Col md={3}>
              <ProductDescription {...data} />{" "}
              {/* data is product, maybe rename */}
            </Col>
            <Col md={3}>
              <CartDescription addToCart={addToCart} product={data} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default DescriptionPage;
