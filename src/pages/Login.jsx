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
          background: "linear-gradient(120deg, #a1f0fc 0%, #c2f7fa 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#f2fcfd",
            borderRadius: 18,
            boxShadow: "0 8px 40px 0 rgba(0,0,0,0.15)",
            padding: "40px 48px",
            minWidth: 400,
            maxWidth: "90vw",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "red", fontSize: 42, marginBottom: 32, fontFamily: "serif" }}>
            Log In
          </h1>
          <div style={{ textAlign: "left", marginBottom: 18 }}>
            <label style={{ fontWeight: 700, fontSize: 22, fontFamily: "serif" }}>
              Your College Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                marginTop: 8,
                marginBottom: 18,
                borderRadius: 8,
                border: "1px solid #d3e0e9",
                fontSize: 18,
                background: "#f8feff",
                outline: "none",
              }}
            />
            <label style={{ fontWeight: 700, fontSize: 22, fontFamily: "serif" }}>
              Your Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                marginTop: 8,
                marginBottom: 8,
                borderRadius: 8,
                border: "1px solid #d3e0e9",
                fontSize: 18,
                background: "#f8feff",
                outline: "none",
              }}
            />
            <div style={{ textAlign: "right", marginBottom: 18 }}>
              <a href="#" style={{ color: "#1976d2", fontSize: 16 }}>
                Forgot Password
              </a>
            </div>
          </div>
          <button
            onClick={handleGoogleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "100%",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 4,
              fontSize: 20,
              fontWeight: 500,
              padding: "10px 0",
              marginBottom: 24,
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              transition: "background 0.2s",
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={{ width: 28, height: 28, background: "#fff" }}
            />
            Continue with Google
          </button>
          {googleError && (
            <div style={{ color: "red", marginBottom: 12, fontSize: 15 }}>{googleError}</div>
          )}
          <button
            onClick={handleEmailLogin}
            style={{
              width: "140px",
              background: "#ff6a00",
              color: "#fff",
              fontWeight: 700,
              fontSize: 22,
              border: "none",
              borderRadius: 6,
              padding: "10px 0",
              marginTop: 10,
              cursor: "pointer",
              fontFamily: "serif",
              boxShadow: "0 2px 8px rgba(255,106,0,0.08)",
              transition: "background 0.2s",
            }}
          >
            Login
          </button>
          {loginError && (
            <div style={{ color: "red", marginTop: 12, fontSize: 15 }}>{loginError}</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}