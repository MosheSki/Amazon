const storeReducer = (state, { type, payload }) => {
  switch (type) {
    case "USER_SIGNIN": {
      return { ...state, userInfo: payload };
    }
    // case "USER_SIGNUP": {
    //   return { ...state, userInfo: action.payload };
    // }
    case "USER_SIGNOUT": {
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };
    }
    case "ADD_TO_CART": {
      const newItem = payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          ) //סינטקס מוזר אבל הוא מחזיר את כל המערך, עם החלפה של את האייטם הישן בחדש
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "REMOVE_PRODUCT": {
      const cartItems = state.cart.cartItems.filter(
        (product) => product._id !== payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "SAVE_SHIPPING_ADDRESS": {
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
      return { ...state, cart: { ...state.cart, shippingAddress: payload } };
    }

    case "SAVE_PAYMENT_METHOD": {
      return { ...state, cart: { ...state.cart, paymentMethod: payload } };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
      };
    }
    default:
      return { ...state };
  }
};

export default storeReducer;
