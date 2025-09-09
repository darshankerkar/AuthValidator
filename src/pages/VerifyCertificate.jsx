import React, { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

export default function VerifyCertificate() {
  const [file, setFile] = useState(null);
  const [certType, setCertType] = useState("");
  const [result, setResult] = useState(""); // OCR result
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Verification message

  const handleVerify = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/ocr/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to verify");
      }

      const data = await response.json();
      setResult(data.extracted_text || "No text found.");
      setMessage("Certificate verified successfully!"); // Set success message
    } catch (err) {
      console.error(err);
      setResult("Error verifying certificate");
      setMessage("Certificate verification failed."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ flex: 1, background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 16px 0 16px" }}>
          <p
            style={{
              fontSize: 22,
              textAlign: "center",
              marginBottom: 60,
              marginTop: 30,
              color: "#222",
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            Upload your academic certificate to verify its authenticity using our AI-powered
            blockchain verification system. Get instant results with complete security and privacy.
          </p>
          <div
            style={{
              background: "#a4f8a2ff",
              borderRadius: 10,
              boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              maxWidth: 420,
              margin: "0 auto",
              padding: "36px 32px 32px 32px",
              textAlign: "left",
            }}
          >
            <h2 style={{ fontFamily: "serif", fontWeight: 700, fontSize: 30, marginBottom: 24 }}>
              Upload Certificate
            </h2>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 10 }}>
              Select Certificate File (PDF or Image)
            </div>
            <label
              htmlFor="file-upload"
              style={{
                display: "block",
                width: "100%",
                background: "#f6f8fa",
                border: "1px solid #e0e0e0",
                borderRadius: 6,
                padding: "14px 0",
                textAlign: "center",
                color: "#888",
                fontSize: 18,
                cursor: "pointer",
                marginBottom: 22,
              }}
            >
              {file ? file.name : "Click to upload a file"}
              <input
                id="file-upload"
                type="file"
                accept=".pdf,image/*"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 10 }}>
              Certificate Type
            </div>
            <select
              value={certType}
              onChange={(e) => setCertType(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 10px",
                borderRadius: 6,
                border: "1px solid #e0e0e0",
                fontSize: 17,
                marginBottom: 28,
                color: certType ? "#222" : "#888",
                background: "#f6f8fa",
                outline: "none",
              }}
            >
              <option value="" disabled>
                Select certificate type
              </option>
              <option value="degree">Degree</option>
              <option value="marksheet">Marksheet</option>
              <option value="diploma">Diploma</option>
              <option value="other">Other</option>
            </select>
            <button
              onClick={handleVerify}
              style={{
                width: "100%",
                background: "#1787e0",
                color: "#fff",
                fontWeight: 600,
                fontSize: 20,
                border: "none",
                borderRadius: 7,
                padding: "13px 0",
                cursor: "pointer",
                marginTop: 10,
                transition: "background 0.2s",
              }}
              disabled={!file || !certType || loading}
            >
              {loading ? "Verifying..." : "Verify Certificate"}
            </button>

            {message && (
              <div
                style={{
                  marginTop: 20,
                  padding: message.includes("failed") ? "22px 18px" : "12px",
                  color: message.includes("failed") ? "#fff" : "green",
                  background: message.includes("failed") ? "#e53935" : "transparent",
                  borderRadius: 8,
                  fontSize: message.includes("failed") ? 22 : 18,
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: 0.5,
                  boxShadow: message.includes("failed")
                    ? "0 2px 12px rgba(229,57,53,0.12)"
                    : "none",
                }}
              >
                {message.includes("failed")
                  ? "Certificate verification failed. Forgery Detected!"
                  : message}
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
