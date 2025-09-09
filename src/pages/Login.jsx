import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleGoogleLogin = async () => {
    setGoogleError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/welcome");
    } catch (error) {
      setGoogleError(error.message);
    }
  };

  const handleEmailLogin = async () => {
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/welcome");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.75)",
            borderRadius: 22,
            boxShadow: "0 8px 40px 0 rgba(0,0,0,0.13)",
            padding: "48px 54px",
            minWidth: 350,
            maxWidth: "92vw",
            textAlign: "center",
            backdropFilter: "blur(8px)",
            border: "1.5px solid #e0eafc",
          }}
        >
          <h1 style={{ color: "#1976d2", fontSize: 40, marginBottom: 28, fontFamily: "serif", fontWeight: 800, letterSpacing: 1 }}>
            Log In
          </h1>
          <div style={{ textAlign: "left", marginBottom: 18 }}>
            <label style={{ fontWeight: 700, fontSize: 20, fontFamily: "serif", color: "#222" }}>
              Your College Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 15px",
                marginTop: 8,
                marginBottom: 18,
                borderRadius: 10,
                border: "1.5px solid #b6c6e3",
                fontSize: 18,
                background: "#f8feff",
                outline: "none",
                boxShadow: "0 1px 4px rgba(25,118,210,0.04)",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => (e.target.style.border = '1.5px solid #1976d2')}
              onBlur={e => (e.target.style.border = '1.5px solid #b6c6e3')}
            />
            <label style={{ fontWeight: 700, fontSize: 20, fontFamily: "serif", color: "#222" }}>
              Your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 15px",
                marginTop: 8,
                marginBottom: 8,
                borderRadius: 10,
                border: "1.5px solid #b6c6e3",
                fontSize: 18,
                background: "#f8feff",
                outline: "none",
                boxShadow: "0 1px 4px rgba(25,118,210,0.04)",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => (e.target.style.border = '1.5px solid #1976d2')}
              onBlur={e => (e.target.style.border = '1.5px solid #b6c6e3')}
            />
            <div style={{ textAlign: "right", marginBottom: 18 }}>
              <a href="#" style={{ color: "#1976d2", fontSize: 16, textDecoration: "underline dotted" }}>
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            onClick={handleGoogleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
              background: "linear-gradient(90deg, #fff 60%, #e3f0ff 100%)",
              border: "1.5px solid #b6c6e3",
              borderRadius: 8,
              fontSize: 20,
              fontWeight: 600,
              padding: "12px 0",
              marginBottom: 24,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #e3f0ff 0%, #fff 100%)')}
            onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #fff 60%, #e3f0ff 100%)')}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={{ width: 28, height: 28, background: "#fff", borderRadius: 4, boxShadow: "0 1px 4px #e0eafc" }}
            />
            Continue with Google
          </button>
          {googleError && (
            <div style={{ color: "#e74c3c", marginBottom: 12, fontSize: 16, fontWeight: 600, textAlign: "center" }}>{googleError}</div>
          )}
          <button
            onClick={handleEmailLogin}
            style={{
              width: "160px",
              background: "linear-gradient(90deg, #ff6a00 0%, #ffb347 100%)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 22,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              marginTop: 10,
              cursor: "pointer",
              fontFamily: "serif",
              boxShadow: "0 2px 8px rgba(255,106,0,0.10)",
              transition: "background 0.2s, box-shadow 0.2s",
              letterSpacing: 0.5,
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #ffb347 0%, #ff6a00 100%)')}
            onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #ff6a00 0%, #ffb347 100%)')}
          >
            Login
          </button>
          {loginError && (
            <div style={{ color: "#e74c3c", marginTop: 14, fontSize: 16, fontWeight: 600, textAlign: "center" }}>{loginError}</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}