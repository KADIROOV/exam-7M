import React from "react";
import "../Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart ({cartItems.length})</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div>
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-details">
                <span className="qty">{item.quantity}x</span> @ ${item.price}{" "}
                <span className="price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </p>
            </div>
            <button
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              ×
            </button>
          </div>
        ))
      )}

      <div className="cart-total">
        <span>Order Total</span>
        <span className="total-price">${totalPrice}</span>
      </div>

      <div className="carbon-note">
        <img src="public/images/icon-carbon-neutral.svg" alt="" />
        <p>
          This is a <strong>carbon-neutral</strong> delivery
        </p>
      </div>

      <button className="confirm-btn">Confirm Order</button>
    </div>
  );
};

export default Cart;
