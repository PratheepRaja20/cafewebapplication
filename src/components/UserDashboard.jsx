import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/menu/all")
      .then((res) => res.json())
      .then(setMenuItems)
      .catch((err) => console.error("Error fetching menu items:", err));
  }, []);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Clear all items in cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <body id="sizeadj">
      <div className="user-dashboard">
        <UserNavbar />

        <div className="user-content">
          <h3 className="section-title">📋 Menu Items</h3>
          <div className="cards">
            {menuItems.map((item) => (
              <div key={item.id} className="card">
                {item.image && (
                  <img
                    src={`http://localhost:8080/uploads/${item.image}`}
                    alt={item.name}
                    className="card-image"
                  />
                )}
                <h4>{item.name}</h4>
                <p>Category: {item.category}</p>
                <p>₹{item.price}</p>
                <button className="add-btn" onClick={() => handleAddToCart(item)}>
                  ➕ Add to Cart
                </button>
              </div>
            ))}
            {menuItems.length === 0 && <p>No menu items available.</p>}
          </div>

          {/* 🛒 Cart Section */}
          <div className="cart-summary">
            <h3>🛒 Cart</h3>
            {cart.length === 0 ? (
              <p>Cart is empty.</p>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      {item.name} — Qty: {item.quantity} × ₹{item.price} = ₹
                      {(item.quantity * item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <hr style={{ margin: "16px 0" }} />
                <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  🧹 Clear Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </body>
  );
}
