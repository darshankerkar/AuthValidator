import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1500); // Redirect to Welcome page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #e3f0ff 0%, #fafdff 100%)" }}>
      <Header />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderRadius: 28,
          boxShadow: "0 8px 32px 0 rgba(80,120,200,0.13)",
          padding: "54px 60px 44px 60px",
          minWidth: 380,
          maxWidth: "92vw",
          textAlign: "center",
          border: "1.5px solid #e3e8f0",
          transition: "box-shadow 0.2s",
        }}>
          <h1 style={{ color: "#1976d2", fontSize: 40, marginBottom: 28, fontFamily: "serif", letterSpacing: 1, fontWeight: 800 }}>Sign Up</h1>
          <div style={{ textAlign: "left", marginBottom: 22 }}>
            <label style={{ fontWeight: 700, fontSize: 20, fontFamily: "serif", color: "#1976d2" }}>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "16px 18px", marginTop: 8, marginBottom: 18, borderRadius: 12, border: "1.5px solid #b6c6e3", fontSize: 18, background: "#f6faff", color: "#222", outline: "none", transition: "border 0.2s", boxShadow: "0 1px 4px rgba(80,120,200,0.04)" }} />
            <label style={{ fontWeight: 700, fontSize: 20, fontFamily: "serif", color: "#1976d2" }}>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "16px 18px", marginTop: 8, marginBottom: 18, borderRadius: 12, border: "1.5px solid #b6c6e3", fontSize: 18, background: "#f6faff", color: "#222", outline: "none", transition: "border 0.2s", boxShadow: "0 1px 4px rgba(80,120,200,0.04)" }} />
            <label style={{ fontWeight: 700, fontSize: 20, fontFamily: "serif", color: "#1976d2" }}>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ width: "100%", padding: "16px 18px", marginTop: 8, marginBottom: 10, borderRadius: 12, border: "1.5px solid #b6c6e3", fontSize: 18, background: "#f6faff", color: "#222", outline: "none", transition: "border 0.2s", boxShadow: "0 1px 4px rgba(80,120,200,0.04)" }} />
          </div>
          <button onClick={handleSignUp} style={{ width: "180px", background: "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)", color: "#fff", fontWeight: 700, fontSize: 22, border: "none", borderRadius: 10, padding: "14px 0", marginTop: 12, cursor: "pointer", fontFamily: "serif", boxShadow: "0 2px 8px rgba(25,118,210,0.10)", transition: "background 0.2s, box-shadow 0.2s", letterSpacing: 1 }}>Sign Up</button>
          {error && <div style={{ color: "#ff1744", marginTop: 14, fontSize: 16, fontWeight: 600 }}>{error}</div>}
          {success && <div style={{ color: "#2ecc71", marginTop: 14, fontSize: 16, fontWeight: 600 }}>{success}</div>}
        </div>
      </div>
      <Footer />
    </div>
  );
}
