import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Buttom from "react-bootstrap/Button";
import { Store } from "../../Store";
import { useContext } from "react";
import Rating from "../Shared/Rating";
import { addToCartHandler } from "../../utils";

const Product = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  return (
    <Card className="product-card mb-4">
      <Link to={`/product/${product.token}`}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
        ></Card.Img>
      </Link>
      <Card.Body className="card-body">
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Rating
          rating={product.rating.rate}
          numReviews={product.rating.count}
        ></Rating>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Buttom variant="light" disabled>
            Out of Stock
          </Buttom>
        ) : (
          <Buttom
            className="btn-primary"
            onClick={() => {
              addToCartHandler(product, cartItems, ctxDispatch);
            }}
          >
            Add to Cart
          </Buttom>
        )}
      </Card.Body>
    </Card>
  );
};
Product.propTypes = { product: PropTypes.object };

export default Product;
