import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import Layout from "./Day7/components/Layout";
import Notification from "./Day7/components/Notification";
import ProtectedRoute from "./Day7/components/ProtectedRoute";

// Lazy Pages
const Home = lazy(() => import("./Day7/pages/Home"));
const Products = lazy(() => import("./Day7/pages/Products"));
const ProductDetails = lazy(() => import("./Day7/pages/ProductDetails"));
const Wishlist = lazy(() => import("./Day7/pages/Wishlist"));
const Cart = lazy(() => import("./Day7/pages/Cart"));
const Checkout = lazy(() => import("./Day7/pages/Checkout"));
const Profile = lazy(() => import("./Day7/pages/Profile"));
const NotFound = lazy(() => import("./Day7/pages/NotFound"));
const OrderHistory = lazy(() => import("./Day7/pages/OrderHistory"));
const AdminDashboard = lazy(() => import("./Day7/pages/AdminDashboard"));
const NotificationPage = lazy(() => import("./Day7/pages/Notification"));

function App() {

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // popup notifications
  const [notifications, setNotifications] = useState([]);

  // notification history
  const [allNotifications, setAllNotifications] = useState([]);

  // unread count
  const [unreadCount, setUnreadCount] = useState(0);

  // add notification
  const addNotification = (message, type = "success") => {
    const id = Date.now();
    const newNotif = { id, message, type };

    // popup
    setNotifications((prev) => [...prev, newNotif]);

    // save history
    setAllNotifications((prev) => [...prev, newNotif]);

    // unread count increase
    setUnreadCount((prev) => prev + 1);
  };

  // remove popup notification only
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // clear all notifications
  const clearNotifications = () => {
    setAllNotifications([]);
    setUnreadCount(0);
  };

  // add to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, quantity }];
    });

    addNotification(`${product.title} added to cart 🛒`);
  };

  // wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        addNotification(`${product.title} removed from wishlist ❌`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        addNotification(`${product.title} added to wishlist ❤️`);
        return [...prev, product];
      }
    });
  };

  return (
    <BrowserRouter>

      {/* pass unreadCount to Layout */}
      <Layout unreadCount={unreadCount}>

        {/* Popup Notifications */}
        <Notification
          notifications={notifications}
          removeNotification={removeNotification}
        />

        <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading...</h2>}>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route
              path="/products"
              element={
                <Products
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              }
            />

            <Route
              path="/wishlist"
              element={
                <Wishlist
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  addNotification={addNotification}
                />
              }
            />

            {/* Notification Page */}
            <Route
              path="/notifications"
              element={
                <NotificationPage
                  notifications={allNotifications}
                  clearNotifications={clearNotifications}
                  setUnreadCount={setUnreadCount}
                />
              }
            />

            <Route
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  setCart={setCart}
                  addNotification={addNotification}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />

          </Routes>

        </Suspense>

      </Layout>

    </BrowserRouter>
  );
}

export default App;