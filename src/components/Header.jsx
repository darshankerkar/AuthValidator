import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase/config";
import ModalLogin from "./ModalLogin";
import ModalSignUp from "./ModalSignUp";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();
  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header"
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
  <div className="header-brand" style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 320 }}>
        <img
          src="/AuthValidator_Logo.png"
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
  {/* Mobile hamburger toggle */}
  {/* Hamburger menu icon (visible on mobile) */}
  {/* Hamburger menu icon (visible on mobile only) */}
  {isMobile && (!mobileOpen ? (
    <button
      className="nav-toggle"
      aria-label="Open menu"
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen(true)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 8,
        marginRight: 8,
        zIndex: 1200,
      }}
    >
      <span style={{ display: "block", width: 22, height: 2, background: "#1976d2", margin: "4px 0" }} />
      <span style={{ display: "block", width: 18, height: 2, background: "#1976d2", margin: "4px 0" }} />
      <span style={{ display: "block", width: 14, height: 2, background: "#1976d2", margin: "4px 0" }} />
    </button>
  ) : (
    <button
      className="nav-toggle"
      aria-label="Close menu"
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen(false)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 8,
        marginRight: 8,
        zIndex: 1200,
      }}
    >
      {/* Cross (X) icon */}
      <span style={{
        display: "block",
        width: 24,
        height: 24,
        position: "relative",
      }}>
        <span style={{
          position: "absolute",
          left: 0,
          top: 11,
          width: 24,
          height: 2,
          background: "#1976d2",
          transform: "rotate(45deg)",
        }} />
        <span style={{
          position: "absolute",
          left: 0,
          top: 11,
          width: 24,
          height: 2,
          background: "#1976d2",
          transform: "rotate(-45deg)",
        }} />
      </span>
    </button>
  ))}

  {/* Only show dropdown menu when hamburger is open */}
  {/* Mobile dropdown nav */}
  {isMobile && mobileOpen && (
    <nav className="site-nav mobile-open" style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255,255,255,0.98)",
      zIndex: 1100,
      boxShadow: "0 8px 32px 0 rgba(80,120,200,0.13)",
      padding: "80px 0 0 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 32,
    }}>
      <a style={navLinkStyle} onClick={() => { navigate("/"); setMobileOpen(false); }}>Home</a>
      <a style={navLinkStyle} onClick={() => { navigate("/verify-certificate"); setMobileOpen(false); }}>Verify Certificate</a>
      <a style={navLinkStyle} onClick={() => { navigate("/institution-portal"); setMobileOpen(false); }}>Institution Portal</a>
      <a style={navLinkStyle} onClick={() => { navigate("/admin-dashboard"); setMobileOpen(false); }}>Admin Dashboard</a>
      {user ? (
        <button
          style={{ ...loginBtnStyle, marginTop: 16, width: 180 }}
          onClick={() => { auth.signOut(); setMobileOpen(false); }}
        >
          Log Out
        </button>
      ) : (
        <>
          <button
            style={{ ...loginBtnStyle, marginTop: 16, width: 180 }}
            onClick={() => { setShowLoginModal(true); setMobileOpen(false); }}
          >
            Log In
          </button>
          <button
            style={{ ...signupBtnStyle, marginTop: 8, width: 180 }}
            onClick={() => { setShowSignUpModal(true); setMobileOpen(false); }}
          >
            Sign Up
          </button>
        </>
      )}
    </nav>
  )}

  {/* Desktop/laptop nav */}
  {!isMobile && (
    <nav className="site-nav desktop-nav" style={{ display: "flex", alignItems: "center", gap: 40 }}>
      <a style={navLinkStyle} onClick={() => navigate("/")}>Home</a>
      <a style={navLinkStyle} onClick={() => navigate("/verify-certificate")}>Verify Certificate</a>
      <a style={navLinkStyle} onClick={() => navigate("/institution-portal")}>Institution Portal</a>
      <a style={navLinkStyle} onClick={() => navigate("/admin-dashboard")}>Admin Dashboard</a>
      {user ? (
        <button
          style={{ ...loginBtnStyle, marginLeft: 24 }}
          onClick={() => auth.signOut()}
        >
          Log Out
        </button>
      ) : (
        <>
          <button
            style={{ ...loginBtnStyle, marginLeft: 24 }}
            onClick={() => setShowLoginModal(true)}
          >
            Log In
          </button>
          <button
            style={{ ...signupBtnStyle, marginLeft: 16 }}
            onClick={() => setShowSignUpModal(true)}
          >
            Sign Up
          </button>
        </>
      )}
    </nav>
  )}

  {/* Render modals outside nav for proper overlay */}
  {showLoginModal && (
    <ModalLogin onClose={() => setShowLoginModal(false)} onSuccess={() => setShowLoginModal(false)} />
  )}
  {showSignUpModal && (
    <ModalSignUp onClose={() => setShowSignUpModal(false)} onSuccess={() => setShowSignUpModal(false)} />
  )}
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