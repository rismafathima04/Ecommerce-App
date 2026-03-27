import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Wishlist({ wishlist, toggleWishlist }) {
  return (
    <div style={{ width:"98vw",padding: "40px", minHeight: "80vh" }}>
      <h1>Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {wishlist.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <ProductCard
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;