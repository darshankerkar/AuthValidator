import { useNavigate } from "react-router-dom"; // Add this import

export const Header = () => {
  const navigate = useNavigate(); // Add this line

  return (
    <header
      style={{
        background: "#f8f9fa",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {/* Logo and Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="AuthValidator_Logo.png" // Change to your logo path
          alt="AuthValidator Logo"
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            marginRight: 12,
            objectFit: "contain",
          }}
        />
        <span
          style={{
            color: "#1976d2",
            fontWeight: 700,
            fontSize: 28,
            fontFamily: "serif",
            letterSpacing: 0.5,
          }}
        >
          AuthValidator
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <a href="#" style={navLinkStyle}>
          Home
        </a>
        <a href="#" style={navLinkStyle}>
          Verify Certificate
        </a>
        <a href="#" style={navLinkStyle}>
          Institution Portal
        </a>
        <a href="#" style={navLinkStyle}>
          Admin Dashboard
        </a>
        <button
          style={{ ...logoutBtnStyle, marginLeft: 40, paddingLeft: 26 }} // Added left padding to Log In
          className="login ml-[20px]"
          onClick={() => navigate("/login")} // Navigate to /login on click
        >
          Log In
        </button>
        <button
          style={{ ...logoutBtnStyle, marginLeft: 0 }} // Removed margin left from Sign Up
        >
          Sign Up
        </button>
      </nav>
    </header>
  );
};

const navLinkStyle = {
  color: "#222",
  textDecoration: "none",
  fontSize: 18,
  fontWeight: 500,
  padding: "4px 0",
  transition: "color 0.2s",
};

const logoutBtnStyle = {
  marginLeft: 24,
  padding: "8px 24px",
  background: "#e9ecef",
  border: "none",
  borderRadius: 8,
  color: "#6c757d",
  fontWeight: 600,
  fontSize: 18,
  cursor: "pointer",
  transition: "background 0.2s",
};