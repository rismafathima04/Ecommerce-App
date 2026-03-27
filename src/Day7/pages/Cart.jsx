import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // Show temporary toast
  const showToast = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    showToast("Quantity updated");
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        minHeight: "80vh",
        width: "98vw",
        padding: "40px",
        boxSizing: "border-box"
      }}
    >
      <h1>Cart Page</h1>

      {/* TOAST MESSAGE */}
      {message && (
        <div
          style={{
            background: "#333",
            color: "white",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            width: "fit-content"
          }}
        >
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                border: "1px solid #ddd",
                padding: "15px",
                marginTop: "20px",
                borderRadius: "8px",
                width: "100%"
              }}
            >
              {/* PRODUCT IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />

              {/* PRODUCT INFO */}
              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
              </div>

              {/* QUANTITY CONTROL */}
              <div>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              {/* ITEM TOTAL */}
              <p>${(item.price * item.quantity).toFixed(2)}</p>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  borderRadius: "5px"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* SUBTOTAL */}
          <h2 style={{ marginTop: "30px" }}>Subtotal: ${subtotal.toFixed(2)}</h2>

          {/* PROCEED TO CHECKOUT */}
          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;