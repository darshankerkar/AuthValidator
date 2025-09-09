import React, { useState, useRef } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { FaCloudUploadAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function VerifyCertificate() {
  const [file, setFile] = useState(null);
  const [certType, setCertType] = useState("");
  const [result, setResult] = useState(""); // OCR result
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Verification message
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleVerify = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      setMessage("");
      const response = await fetch("http://127.0.0.1:8000/api/ocr/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to verify");
      }
      const data = await response.json();
      setResult(data.extracted_text || "No text found.");
      setMessage("Certificate verified successfully!");
    } catch (err) {
      setResult("Error verifying certificate");
      setMessage("Certificate verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #e3f0ff 0%, #fafdff 100%)" }}>
      <Header />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: "100%",
          maxWidth: 500,
          margin: "48px auto 0 auto",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 32px 0 rgba(80,120,200,0.13)",
          padding: "40px 32px 32px 32px",
          textAlign: "center",
          position: "relative"
        }}>
          <h1 style={{ fontFamily: "serif", fontWeight: 800, fontSize: 34, color: "#1976d2", marginBottom: 8, letterSpacing: 1 }}>Verify Certificate</h1>
          <div style={{ color: "#555", fontSize: 19, marginBottom: 32, fontWeight: 500 }}>
            Upload your academic certificate to verify its authenticity using our AI-powered blockchain verification system.
          </div>
          {/* Drag and Drop Area */}
          <form
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{ marginBottom: 24 }}
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            <div
              style={{
                border: dragActive ? "2.5px dashed #27c99a" : "2.5px dashed #b6c6e3",
                borderRadius: 12,
                padding: "32px 0 24px 0",
                background: dragActive ? "#e3f0ff" : "#fafdff",
                cursor: "pointer",
                transition: "border 0.2s, background 0.2s",
                marginBottom: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <FaCloudUploadAlt size={48} color={dragActive ? "#27c99a" : "#1976d2"} style={{ marginBottom: 10 }} />
              <div style={{ fontSize: 18, color: dragActive ? "#27c99a" : "#1976d2", fontWeight: 700 }}>
                {file ? file.name : "Drag & drop or click to upload PDF/Image"}
              </div>
              <input
                ref={inputRef}
                id="file-upload"
                type="file"
                accept=".pdf,image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </form>
          {/* Certificate Type */}
          <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 10, textAlign: "left" }}>
            Certificate Type
          </div>
          <select
            value={certType}
            onChange={(e) => setCertType(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 10px",
              borderRadius: 8,
              border: "1.5px solid #b6c6e3",
              fontSize: 17,
              marginBottom: 28,
              color: certType ? "#222" : "#888",
              background: "#f6f8fa",
              outline: "none",
              fontWeight: 500
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
              background: loading ? "#b6c6e3" : "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              border: "none",
              borderRadius: 10,
              padding: "14px 0",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 10,
              marginBottom: 8,
              boxShadow: "0 2px 8px rgba(25,118,210,0.10)",
              letterSpacing: 1,
              transition: "background 0.2s, box-shadow 0.2s"
            }}
            disabled={!file || !certType || loading}
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
          {/* Result/Message */}
          {message && (
            <div
              style={{
                marginTop: 24,
                padding: "18px 12px 18px 12px",
                borderRadius: 12,
                background: message.includes("failed") ? "#ffeaea" : "#e6f9ed",
                color: message.includes("failed") ? "#e53935" : "#27c99a",
                fontWeight: 700,
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                boxShadow: message.includes("failed") ? "0 2px 12px rgba(229,57,53,0.12)" : "0 2px 8px rgba(44,204,113,0.10)",
                border: message.includes("failed") ? "1.5px solid #e53935" : "1.5px solid #27c99a"
              }}
            >
              {message.includes("failed") ? (
                <FaExclamationTriangle size={28} style={{ marginRight: 6 }} />
              ) : (
                <FaCheckCircle size={28} style={{ marginRight: 6 }} />
              )}
              {message.includes("failed")
                ? "Certificate verification failed. Forgery Detected!"
                : message}
            </div>
          )}
          {/* OCR Result (optional) */}
          {result && !message.includes("failed") && (
            <div style={{
              marginTop: 18,
              background: "#fafdff",
              border: "1.5px solid #b6c6e3",
              borderRadius: 10,
              padding: "16px 12px",
              color: "#1976d2",
              fontWeight: 500,
              fontSize: 16,
              textAlign: "left"
            }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Extracted Text:</div>
              <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
