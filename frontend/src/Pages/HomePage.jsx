import { useEffect, useReducer } from "react";
import Title from "../Components/Shared/Title";
import homePageReducer from "../Reducers/homePageReducer";
import axios from "axios";
import Loading from "../Components/Shared/Loading";
import MessageBox from "../Components/Shared/MessageBox";
import Products from "../Components/HomePage/Products";

const initialState = { loading: true, error: "", data: [] };
export const HomePage = () => {
  const [state, dispatch] = useReducer(homePageReducer, initialState);
  const { loading, error, data } = state;
  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: "GET_REQUEST" });
      try {
        const { data } = await axios.get("/api/v1/products");
        dispatch({ type: "GET_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "GET_FAIL", payload: error.message });
        console.log(error.message);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <Title title="Home Page" />
      <div className="backgroundHomePage">
        <img
          style={{ width: "100%" }}
          src="https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg"
          alt="backgroundHomePage"
        />
      </div>
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Products products={data}></Products>
        )}
      </div>
    </div>
  );
};
