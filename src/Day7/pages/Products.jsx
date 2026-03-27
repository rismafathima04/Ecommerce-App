import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function Products({ wishlist, toggleWishlist }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 3;

  
  useEffect(() => {
    const api=import.meta.env.VITE_API_URL;

    const cachedProducts =
      JSON.parse(localStorage.getItem("products"));

    if (cachedProducts) {
      setProducts(cachedProducts);
      setLoading(false);
      return;
    }

    fetch("api")
      .then((res) => res.json())
      .then((data) => {

        const formattedProducts = data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category === "electronics"
            ? "Electronics"
            : "Accessories"
        }));

        setProducts(formattedProducts);

        localStorage.setItem(
          "products",
          JSON.stringify(formattedProducts)
        );

        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });

  }, []);

  
  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading products...</h2>;
  }


  if (error) {
    return <h2 style={{ padding: "40px" }}>{error}</h2>;
  }

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      categoryFilter === "All" || product.category === categoryFilter;

    const priceMatch =
      product.price >= minPrice && product.price <= maxPrice;

    return categoryMatch && priceMatch;
  });

  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    searchedProducts.length / productsPerPage
  );

  const resetFilters = () => {
    setCategoryFilter("All");
    setMinPrice(0);
    setMaxPrice(1000);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div
      style={{ display: "flex", gap: "20px", padding: "40px 20px" }}
    >

      {/* Sidebar */}
      <aside
        style={{
          minWidth: "200px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
        }}
      >

        <h3>Filters</h3>

        {/* Category Filter */}
        <p><strong>Category</strong></p>

        <label>
          <input
            type="radio"
            name="category"
            value="All"
            checked={categoryFilter === "All"}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
          All
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="category"
            value="Electronics"
            checked={categoryFilter === "Electronics"}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
          Electronics
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="category"
            value="Accessories"
            checked={categoryFilter === "Accessories"}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          />
          Accessories
        </label>

        {/* Price Filter */}
        <div style={{ marginTop: "20px" }}>

          <p><strong>Price Range</strong></p>

          <label>Min</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ width: "60px", marginLeft: "5px" }}
          />
          <br />

          <label>Max</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{ width: "60px", marginLeft: "5px" }}
          />
        </div>

        <button
          onClick={resetFilters}
          style={{
            marginTop: "20px",
            padding: "6px 10px",
            cursor: "pointer"
          }}
        >
          Reset Filters
        </button>

      </aside>

      {/* Right Section */}
      <div style={{ flex: 1 }}>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        {/* Products */}
        <main
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            minHeight: "80vh",
          }}
        >

          {searchedProducts.length === 0 ? (
            <p>No products match your filters.</p>
          ) : (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ width: "100%", marginTop: "20px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      marginRight: "5px",
                      padding: "5px 10px",
                      background:
                        currentPage === page ? "black" : "#ddd",
                      color:
                        currentPage === page ? "white" : "black",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Products;