import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight:"80vh",padding: "20px" }}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;