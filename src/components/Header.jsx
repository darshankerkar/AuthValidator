import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase/config";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const userBtnRef = useRef();
  // Hide logout dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userBtnRef.current && !userBtnRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    if (showLogout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogout]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

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
        {user ? (
          <div style={{ position: "relative", marginLeft: 40 }} ref={userBtnRef}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontWeight: 700,
                fontSize: 20,
                color: "#1976d2",
                background: "linear-gradient(90deg, #e3f0ff 0%, #cbe5ff 100%)",
                borderRadius: 999,
                padding: "10px 28px 10px 18px",
                boxShadow: "0 2px 12px rgba(25,118,210,0.10)",
                letterSpacing: 1,
                border: "2px solid #b6c6e3",
                cursor: "pointer",
                transition: "background 0.2s, box-shadow 0.2s, border 0.2s",
                outline: showLogout ? "2px solid #1976d2" : "none",
              }}
              onClick={() => setShowLogout((v) => !v)}
              onMouseOver={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #cbe5ff 0%, #e3f0ff 100%)';
                e.currentTarget.style.border = '2px solid #1976d2';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #e3f0ff 0%, #cbe5ff 100%)';
                e.currentTarget.style.border = '2px solid #b6c6e3';
              }}
            >
              <span style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#1976d2",
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                boxShadow: "0 1px 4px rgba(25,118,210,0.10)",
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="7" r="4" fill="#fff" fillOpacity=".7"/>
                  <ellipse cx="10" cy="15.5" rx="6.5" ry="3.5" fill="#fff" fillOpacity=".4"/>
                </svg>
              </span>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 180 }}>
                {user.displayName || user.email}
              </span>
            </button>
            {showLogout && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: "#fff",
                  border: "1.5px solid #e3e8f0",
                  borderRadius: 8,
                  boxShadow: "0 4px 16px rgba(80,120,200,0.13)",
                  zIndex: 1000,
                  minWidth: 160,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff1744",
                    fontWeight: 700,
                    fontSize: 18,
                    padding: "14px 0",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onClick={() => { auth.signOut(); setShowLogout(false); }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
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