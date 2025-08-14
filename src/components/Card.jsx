import React, { useEffect, useState } from "react";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, inc, dec } from "../redux/cartSlice";
import Cart from "./Cart";

const Card = () => {
  const [desserts, setDesserts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts")
      .then((res) => res.json())
      .then((data) => setDesserts(data.data))
      .catch((err) => console.error(err));
  }, []);

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container mx-auto lg:pl-10 lg:pr-10 pl-1 pr-1">
      <h2 className="Title">Desserts</h2>
      <div className="  xl:flex gap-5 ">
        <div className="card-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5   ">
          {desserts.map((dessert) => {
            const quantity = getQuantity(dessert.id);

            return (
              <div className="card" key={dessert.id}>
                <picture>
                  <source
                    media="(min-width:650px)"
                    srcSet={dessert.image.desktop}
                  />
                  <source
                    media="(min-width:465px)"
                    srcSet={dessert.image.tablet}
                  />
                  <img
                    src={dessert.image.mobile}
                    alt={dessert.name}
                    className="card-img"
                  />
                </picture>

                {quantity === 0 ? (
                  <button
                    onClick={() => dispatch(addToCart(dessert))}
                    className="add-to-cart"
                  >
                    <img
                      className="card-icon"
                      src="/images/icon-add-to-cart.svg"
                    />
                    Add to Cart
                  </button>
                ) : (
                  <div className="counter-btns">
                    <button
                      onClick={() => dispatch(dec(dessert.id))}
                      className="btn-minus"
                    >
                      <img src="/images/icon-decrement-quantity.svg" />
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => dispatch(inc(dessert.id))}
                      className="btn-pilus"
                    >
                      <img src="/images/icon-increment-quantity.svg" />
                    </button>
                  </div>
                )}

                <div className="card-info">
                  <p className="category">{dessert.category}</p>
                  <h3 className="title">{dessert.name}</h3>
                  <p className="price">${dessert.price}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default Card;
