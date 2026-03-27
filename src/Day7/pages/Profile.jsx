import { useState, useEffect } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Load saved data
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));

    if (savedProfile) {
      setName(savedProfile.name);
      setEmail(savedProfile.email);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      name,
      email,
      password: newPassword ? newPassword : password
    };

    localStorage.setItem("profile", JSON.stringify(profileData));

    alert("Profile updated successfully");
  };

  return (
    <div
      style={{
        Width: "98vw",
        minHeight:"80vh",
        margin: "50px auto",
        padding: "40px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Profile Settings
      </h2>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>Current Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#6C63FF",
            color: "#fff",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;