import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase/config";
import ModalLogin from "./ModalLogin";
import ModalSignUp from "./ModalSignUp";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const userBtnRef = useRef();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
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
        background: "rgba(255,255,255,0.85)",
        backgroundImage: "linear-gradient(90deg, #e3f0ff 0%, #fafdff 100%)",
        padding: "26px 64px 26px 64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        boxShadow: "0 8px 32px 0 rgba(80,120,200,0.13)",
        borderBottom: "1.5px solid #e3e8f0",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo and Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 320 }}>
        <img
          src="AuthValidator_Logo.png"
          alt="AuthValidator Logo"
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 2px 12px rgba(25,118,210,0.10)",
            marginRight: 16,
            objectFit: "contain",
            border: "2.5px solid #e3e8f0",
          }}
        />
        <span
          style={{
            color: "#1976d2",
            fontWeight: 800,
              fontSize: 24,
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
        <a
          style={navLinkStyle}
          onClick={() => navigate("/")}
          onMouseOver={e => e.currentTarget.style.color = '#1976d2'}
          onMouseOut={e => e.currentTarget.style.color = '#222'}
        >
          Home
        </a>
        <a
          style={navLinkStyle}
          onClick={() => navigate("/verify-certificate")}
          onMouseOver={e => e.currentTarget.style.color = '#1976d2'}
          onMouseOut={e => e.currentTarget.style.color = '#222'}
        >
          Verify Certificate
        </a>
        <a
          style={navLinkStyle}
          onClick={() => navigate("/institution-portal")}
          onMouseOver={e => e.currentTarget.style.color = '#1976d2'}
          onMouseOut={e => e.currentTarget.style.color = '#222'}
        >
          Institution Portal
        </a>
        <a
          style={navLinkStyle}
          onClick={() => navigate("/admin-dashboard")}
          onMouseOver={e => e.currentTarget.style.color = '#1976d2'}
          onMouseOut={e => e.currentTarget.style.color = '#222'}
        >
          Admin Dashboard
        </a>

        {user ? (
          <div style={{ position: "relative", marginLeft: 40 }} ref={userBtnRef}>
            <button
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#1976d2",
                background: showLogout
                  ? "linear-gradient(90deg, #e3f0ff 0%, #cbe5ff 100%)"
                  : "linear-gradient(90deg, #fafdff 0%, #e3f0ff 100%)",
                borderRadius: 16,
                padding: "12px 32px",
                border: showLogout ? "2.5px solid #1976d2" : "2px solid #b6c6e3",
                cursor: "pointer",
                minWidth: 180,
                boxShadow: showLogout
                  ? "0 4px 16px rgba(25,118,210,0.13)"
                  : "0 2px 8px rgba(80,120,200,0.10)",
                transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
                outline: "none",
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 240,
                letterSpacing: 0.5,
              }}
              onClick={() => setShowLogout((v) => !v)}
              onMouseOver={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #cbe5ff 0%, #e3f0ff 100%)';
                e.currentTarget.style.border = '2.5px solid #1976d2';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(25,118,210,0.13)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'linear-gradient(90deg, #fafdff 0%, #e3f0ff 100%)';
                e.currentTarget.style.border = '2px solid #b6c6e3';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(80,120,200,0.10)';
              }}
            >
              {user.displayName || user.email}
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
                  minWidth: 120,
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
                    fontWeight: 600,
                    fontSize: 16,
                    padding: "12px 0",
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
              onClick={() => setShowLoginModal(true)}
            >
              Log In
            </button>
      {showLoginModal && (
        <ModalLogin onClose={() => setShowLoginModal(false)} onSuccess={() => setShowLoginModal(false)} />
      )}
            <button
              style={{ ...signupBtnStyle, marginLeft: 0 }}
              onClick={() => setShowSignUpModal(true)}
            >
              Sign Up
            </button>
      {showSignUpModal && (
        <ModalSignUp onClose={() => setShowSignUpModal(false)} onSuccess={() => setShowSignUpModal(false)} />
      )}
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