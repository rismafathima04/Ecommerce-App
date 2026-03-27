function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      minHeight: "80vh",
      width: "100vw",
      padding: "40px 20px",
      boxSizing: "border-box"
    }}>
      <h1 style={{ fontSize: "4rem", color: "#FF6B6B" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Oops! Page not found.</p>
      <a href="/" style={{
        marginTop: "20px",
        padding: "10px 25px",
        background: "#6C63FF",
        color: "white",
        textDecoration: "none",
        borderRadius: "20px"
      }}>
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;