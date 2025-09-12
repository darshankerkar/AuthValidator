import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function ModalSignUp({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created successfully!");
      setTimeout(() => {
        setSuccess("");
        onSuccess && onSuccess();
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(25, 118, 210, 0.10)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(2px)"
    }}>
      <div className="modal-dialog" style={{
        background: "rgba(255,255,255,0.85)",
        borderRadius: 22,
        boxShadow: "0 8px 32px 0 rgba(25,118,210,0.13)",
        padding: "32px 32px 24px 32px",
        minWidth: 270,
        maxWidth: 350,
        textAlign: "center",
        border: "2.5px solid #2ecc71",
        position: "relative",
        backdropFilter: "blur(16px)",
        backgroundImage: "linear-gradient(135deg, #e3f0ff 0%, #fafdff 100%)",
        transition: "box-shadow 0.2s, border 0.2s, background 0.2s",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: 28, color: "#27c99a", cursor: "pointer", fontWeight: 700, transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color="#ff1744"} onMouseOut={e => e.currentTarget.style.color="#27c99a"}>&times;</button>
        <h1 style={{
          color: "#27c99a",
          fontSize: 28,
          marginBottom: 18,
          fontFamily: "serif",
          fontWeight: 900,
          letterSpacing: 1,
          textShadow: "0 2px 8px #e3f0ff"
        }}>
          Sign Up
        </h1>
        <div style={{ textAlign: "left", marginBottom: 14 }}>
          <label style={{ fontWeight: 700, fontSize: 15, fontFamily: "serif", color: "#27c99a", letterSpacing: 0.2 }}>
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", marginTop: 6, marginBottom: 12, borderRadius: 10, border: "1.5px solid #b6c6e3", fontSize: 15, background: "#fafdff", outline: "none", boxShadow: "0 2px 8px #e3f0ff", transition: "border 0.2s, box-shadow 0.2s" }}
          />
          <label style={{ fontWeight: 700, fontSize: 15, fontFamily: "serif", color: "#27c99a", letterSpacing: 0.2 }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", marginTop: 6, marginBottom: 8, borderRadius: 10, border: "1.5px solid #b6c6e3", fontSize: 15, background: "#fafdff", outline: "none", boxShadow: "0 2px 8px #e3f0ff", transition: "border 0.2s, box-shadow 0.2s" }}
          />
          <label style={{ fontWeight: 700, fontSize: 15, fontFamily: "serif", color: "#27c99a", letterSpacing: 0.2 }}>
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", marginTop: 6, marginBottom: 6, borderRadius: 10, border: "1.5px solid #b6c6e3", fontSize: 15, background: "#fafdff", outline: "none", boxShadow: "0 2px 8px #e3f0ff", transition: "border 0.2s, box-shadow 0.2s" }}
          />
        </div>
        <button
          onClick={handleSignUp}
          style={{
            width: "120px",
            background: "linear-gradient(90deg, #2ecc71 0%, #27c99a 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            border: "none",
            borderRadius: 10,
            padding: "10px 0",
            marginTop: 8,
            cursor: "pointer",
            fontFamily: "serif",
            boxShadow: "0 2px 8px #27c99a",
            transition: "background 0.2s, box-shadow 0.2s",
            letterSpacing: 0.5
          }}
          disabled={loading}
        >
          Sign Up
        </button>
        {error && (
          <div style={{ color: "#e74c3c", marginTop: 14, fontSize: 16, fontWeight: 600, textAlign: "center" }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "#27c99a", marginTop: 14, fontSize: 16, fontWeight: 600, textAlign: "center" }}>{success}</div>
        )}
      </div>
    </div>
  );
}
