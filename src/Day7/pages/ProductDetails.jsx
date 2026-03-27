import { useParams } from "react-router-dom";
import { useState } from "react";

function ProductDetails({ addToCart }) {

  const { id } = useParams();

  
  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  const product = products.find(
    (item) => item.id == id
  );

  const [quantity, setQuantity] = useState(1);

  const [message, setMessage] = useState("");

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product Not Found</h2>;
  }

  return (
    <div style={{ width: "95vw", padding: "40px" }}>

      <img
        src={product.image}
        alt={product.title}
        style={{ width: "200px", marginBottom: "20px" }}
      />

      <h2>{product.title}</h2>

      <p><strong>Price:</strong> ${product.price}</p>

      {/* Rating might not exist in API sometimes */}
      {product.rating && (
        <p><strong>Rating:</strong> {product.rating.rate}</p>
      )}

      {/* Description from API */}
      {product.description && (
        <p><strong>Description:</strong> {product.description}</p>
      )}

      {/* Quantity Selector */}
      <div style={{ margin: "20px 0" }}>

        <button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
          style={{ padding: "5px 10px" }}
        >
          -
        </button>

        <span style={{ margin: "0 15px", fontWeight: "bold" }}>
          {quantity}
        </span>

        <button
          onClick={() => setQuantity(quantity + 1)}
          style={{ padding: "5px 10px" }}
        >
          +
        </button>

      </div>

      {/* Add To Cart */}
      <button
        onClick={() => {
          addToCart(product, quantity);
          setMessage("✅ Item added to cart");
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>

      {/* Feedback */}
      {message && (
        <p style={{ color: "green", marginTop: "15px" }}>
          {message}
        </p>
      )}

    </div>
  );
}

export default ProductDetails;