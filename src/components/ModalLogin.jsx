import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function ModalLogin({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleError, setGoogleError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onSuccess && onSuccess();
    } catch (error) {
      setGoogleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setLoginError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess && onSuccess();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(25, 118, 210, 0.10)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(2px)"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.85)",
        borderRadius: 22,
        boxShadow: "0 8px 32px 0 rgba(25,118,210,0.13)",
        padding: "32px 32px 24px 32px",
        minWidth: 270,
        maxWidth: 350,
        textAlign: "center",
        border: "2.5px solid #21c6f3",
        position: "relative",
        backdropFilter: "blur(16px)",
        backgroundImage: "linear-gradient(135deg, #e3f0ff 0%, #fafdff 100%)",
        transition: "box-shadow 0.2s, border 0.2s, background 0.2s",
      }}>
  <button onClick={onClose} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: 28, color: "#1976d2", cursor: "pointer", fontWeight: 700, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color="#ff1744"} onMouseOut={e => e.currentTarget.style.color="#1976d2"}>&times;</button>
        <h1 style={{
          color: "#1976d2",
          fontSize: 28,
          marginBottom: 18,
          fontFamily: "serif",
          fontWeight: 900,
          letterSpacing: 1,
          textShadow: "0 2px 8px #e3f0ff"
        }}>
          Log In
        </h1>
        <div style={{ textAlign: "left", marginBottom: 14 }}>
          <label style={{ fontWeight: 700, fontSize: 15, fontFamily: "serif", color: "#1976d2", letterSpacing: 0.2 }}>
            Your College Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", marginTop: 6, marginBottom: 12, borderRadius: 10, border: "1.5px solid #b6c6e3", fontSize: 15, background: "#fafdff", outline: "none", boxShadow: "0 2px 8px #e3f0ff", transition: "border 0.2s, box-shadow 0.2s" }}
          />
          <label style={{ fontWeight: 700, fontSize: 15, fontFamily: "serif", color: "#1976d2", letterSpacing: 0.2 }}>
            Your Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", marginTop: 6, marginBottom: 6, borderRadius: 10, border: "1.5px solid #b6c6e3", fontSize: 15, background: "#fafdff", outline: "none", boxShadow: "0 2px 8px #e3f0ff", transition: "border 0.2s, box-shadow 0.2s" }}
          />
        </div>
        <button
          onClick={handleGoogleLogin}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            background: "linear-gradient(90deg, #fff 60%, #e3f0ff 100%)",
            border: "1.5px solid #21c6f3",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            padding: "10px 0",
            marginBottom: 16,
            cursor: "pointer",
            boxShadow: "0 2px 8px #b6c6e3",
            transition: "background 0.2s, box-shadow 0.2s, border 0.2s",
            color: "#1976d2"
          }}
          disabled={loading}
        >
          Continue with Google
        </button>
        {googleError && (
          <div style={{ color: "#e74c3c", marginBottom: 12, fontSize: 16, fontWeight: 600, textAlign: "center" }}>{googleError}</div>
        )}
        <button
          onClick={handleEmailLogin}
          style={{
            width: "120px",
            background: "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 10,
            padding: "10px 0",
            marginTop: 8,
            cursor: "pointer",
            fontFamily: "serif",
            boxShadow: "0 2px 8px #1976d2",
            transition: "background 0.2s, box-shadow 0.2s",
            letterSpacing: 0.5
          }}
          disabled={loading}
        >
          Login
        </button>
        {loginError && (
          <div style={{ color: "#e74c3c", marginTop: 14, fontSize: 16, fontWeight: 600, textAlign: "center" }}>{loginError}</div>
        )}
      </div>
    </div>
  );
}
