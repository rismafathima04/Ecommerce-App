import { Link } from "react-router-dom";
import { memo } from "react";

function ProductCard({ product, wishlist, toggleWishlist, addToCart, addNotification }) {
  if (!product) return null;

  const isWishlisted = wishlist?.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart?.(product, 1);
    addNotification?.(`${product.title} added to cart 🛒`);
  };

  const handleWishlist = () => {
    toggleWishlist?.(product);

    if (isWishlisted) {
      addNotification?.(`${product.title} removed from wishlist ❌`);
    } else {
      addNotification?.(`${product.title} added to wishlist ❤️`);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        width: "250px",
        minHeight: "60vh",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#fff",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "120px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />

        <h3 style={{ margin: "10px 0" }}>{product.title}</h3>
      </Link>

      <p style={{ fontWeight: "bold", color: "#6C63FF" }}>
        ${product.price}
      </p>

      <p>Rating: {product.rating} ⭐</p>

      {/* Add to Cart */}
      {addToCart && (
        <button
          onClick={handleAddToCart}
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            border: "none",
            background: "#6C63FF",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
      )}

      {/* Wishlist */}
      {toggleWishlist && (
        <button
          onClick={handleWishlist}
          style={{
            marginTop: "10px",
            padding: "6px 10px",
            border: "none",
            background: isWishlisted ? "red" : "gray",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {isWishlisted ? "♥" : "♡"} Wishlist
        </button>
      )}

      {/* View Details Button */}
      <div style={{marginTop:"10px"}}></div>
      <Link to={`/product/${product.id}`}>
        <button
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            border: "none",
            background: "black",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          View Details
        </button>
      </Link>

    </div>
  );
}

export default memo(ProductCard);