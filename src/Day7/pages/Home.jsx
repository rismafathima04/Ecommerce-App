import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      height: "80vh",
      width: "96vw",
      backgroundColor: "#f5f5f5"
    }}>
      <h1 style={{ color: "#6C63FF", fontSize: "3rem" }}>
        Welcome to BrightUI Store
      </h1>

      <p style={{ fontSize: "1.2rem", marginTop: "15px" }}>
        Clean design. Pure elegance.
      </p>

      <button
        onClick={() => navigate("/products")}
        style={{
          padding: "12px 30px",
          background: "linear-gradient(to right, #6C63FF, #9F6EFF)",
          color: "white",
          border: "none",
          borderRadius: "25px",
          marginTop: "20px",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;