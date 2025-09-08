import { useNavigate } from "react-router-dom"; // Add this import

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #e3f0ff 0%, #fafdff 100%)",
        padding: "18px 40px 18px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        boxShadow: "0 4px 24px 0 rgba(80,120,200,0.10)",
        borderBottom: "1.5px solid #e3e8f0",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo and Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="AuthValidator_Logo.png"
          alt="AuthValidator Logo"
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#fff",
            boxShadow: "0 2px 12px rgba(25,118,210,0.10)",
            marginRight: 16,
            objectFit: "contain",
            border: "2px solid #e3e8f0",
          }}
        />
        <span
          style={{
            color: "#1976d2",
            fontWeight: 800,
            fontSize: 32,
            fontFamily: "serif",
            letterSpacing: 1,
            textShadow: "0 2px 8px #e3f0ff",
          }}
        >
          AuthValidator
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <a href="#" style={navLinkStyle} onMouseOver={e => e.currentTarget.style.color = '#1976d2'} onMouseOut={e => e.currentTarget.style.color = '#222'}>
          Home
        </a>
        <a href="#" style={navLinkStyle} onMouseOver={e => e.currentTarget.style.color = '#1976d2'} onMouseOut={e => e.currentTarget.style.color = '#222'}>
          Verify Certificate
        </a>
        <a href="#" style={navLinkStyle} onMouseOver={e => e.currentTarget.style.color = '#1976d2'} onMouseOut={e => e.currentTarget.style.color = '#222'}>
          Institution Portal
        </a>
        <a href="#" style={navLinkStyle} onMouseOver={e => e.currentTarget.style.color = '#1976d2'} onMouseOut={e => e.currentTarget.style.color = '#222'}>
          Admin Dashboard
        </a>
        <button
          style={{ ...loginBtnStyle, marginLeft: 40 }}
          className="login ml-[20px]"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          style={{ ...signupBtnStyle, marginLeft: 0 }}
          onClick={() => navigate("/signup")}
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
  fontSize: 19,
  fontWeight: 600,
  padding: "6px 0",
  borderRadius: 4,
  transition: "color 0.2s, background 0.2s",
  letterSpacing: 0.2,
  cursor: "pointer",
};

const loginBtnStyle = {
  marginLeft: 24,
  padding: "10px 28px",
  background: "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)",
  border: "none",
  borderRadius: 10,
  color: "#fff",
  fontWeight: 700,
  fontSize: 18,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(25,118,210,0.10)",
  transition: "background 0.2s, box-shadow 0.2s",
  letterSpacing: 1,
};

const signupBtnStyle = {
  marginLeft: 16,
  padding: "10px 28px",
  background: "linear-gradient(90deg, #2ecc71 0%, #27c99a 100%)",
  border: "none",
  borderRadius: 10,
  color: "#fff",
  fontWeight: 700,
  fontSize: 18,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(44,204,113,0.10)",
  transition: "background 0.2s, box-shadow 0.2s",
  letterSpacing: 1,
};