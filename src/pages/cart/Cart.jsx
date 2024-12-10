import React, { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useCart();

  const increaseQuantity = (product_id) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: { product_id },
    });
  };

  const decreaseQuantity = (product_id) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: { product_id },
    });
  };

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  return (
    <>
      <div>
        <h4>Your cart items</h4>
        <div className="cart_items">
          {state.items.length == 0 ? (
            <h4>Your cart is currently empty</h4>
          ) : (
            state.items.map((item) => (
              <div className="col" key={item.product_id}>
                <div className="img_box">
                  <img src={item.image_url} alt={item.title} />
                </div>
                <div className="body">
                  <h4>{item.title}</h4>
                  <h4>${item.price}</h4>
                  <h4>{item.quantity}</h4>
                </div>
                <div className="btn-box">
                  <button
                    className="btn btn-dark m-2"
                    onClick={() => increaseQuantity(item.product_id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-dark m-2"
                    onClick={() => decreaseQuantity(item.product_id)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))
          )}
          {state.totalAmount == 0 ? (
            <h4></h4>
          ) : (
            <h4>Total: ${state.totalAmount}</h4>
          )}
          {state.items.length == 0 ? (
            ""
          ) : (
            <div className="place_order">
              <button className="btn btn-dark m-2" onClick={clearCart}>
                Clear Cart
              </button>
              <Link className="btn btn-dark" to="/orders/checkout">
                Place Order
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
