import { NavLink } from "react-router-dom";

function Navbar({ unreadCount }) {

  const activeStyle = { color: "#6C63FF", fontWeight: "bold" };
  const linkStyle = { margin: "0 10px", textDecoration: "none", color: "black" };

  return (
    <nav
      aria-label="Main Navigation"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ fontWeight: "bold" }}>E-SHOP</h2>

      <div role="navigation">

        <NavLink
          to="/"
          aria-label="Go to Home page"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          aria-label="Browse products"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Products
        </NavLink>

        <NavLink
          to="/wishlist"
          aria-label="View wishlist"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Wishlist
        </NavLink>

        <NavLink
          to="/cart"
          aria-label="View shopping cart"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Cart
        </NavLink>

        <NavLink
          to="/profile"
          aria-label="View profile settings"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Profile
        </NavLink>

        {/* Notification Bell with Badge */}
        <NavLink
          to="/notifications"
          style={({ isActive }) => ({
            ...(isActive ? activeStyle : linkStyle),
            position: "relative"
          })}
        >
          🔔 Notifications

          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px"
              }}
            >
              {unreadCount}
            </span>
          )}

        </NavLink>

        <NavLink
          to="/orders"
          style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
        >
          Orders
        </NavLink>


      </div>
    </nav>
  );
}

export default Navbar;