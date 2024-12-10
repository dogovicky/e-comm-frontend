import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

const CheckOut = () => {
  const [message, setMessage] = useState("");
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const { state } = useContext(CartContext);
  const cartItems = state.items;

  console.log(user);
  console.log(cartItems);

  const handleCheckout = async () => {
    const url = "http://localhost:8080/orders/checkout";

    const checkOutData = {
      user,
      items: cartItems.map((item) => ({
        product: item,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    console.log(checkOutData.items);

    const response = await axios.post(url, checkOutData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    if ((response.status = 200)) {
      setMessage(
        `Your order has been placed successfully. \nPlease check your email for your order details and delivery date.`
      );
    } else {
      setMessage("Failed to place order! Please try again later");
    }
  };

  return (
    <>
      <div className="checkout">
        <h2>Checkout</h2>
        <div className="card_details">
          <button className="btn btn-dark m-2" onClick={handleCheckout}>
            Place Order
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default CheckOut;
