
import React, { useState } from "react";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { db } from "../firebase/config";
import { collection, writeBatch, Timestamp, doc } from "firebase/firestore";


export default function InstitutionPortal() {
  const [file, setFile] = useState(null);
  const [batchName, setBatchName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [uploadHistory, setUploadHistory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Parse CSV or Excel file and return array of records
  const parseFile = async (file) => {
    return new Promise((resolve, reject) => {
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === "csv") {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data),
          error: (err) => reject(err),
        });
      } else if (["xlsx", "xls"].includes(ext)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet);
          resolve(json);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
      } else {
        reject(new Error("Unsupported file type"));
      }
    });
  };

  // Simulate certificate verification (replace with real logic as needed)
  const verifyCertificate = (record) => {
    // For demo: randomly mark as Success or Forgery
    return Math.random() > 0.1 ? "Success" : "Forgery Detected";
  };

  // Upload and verify all certificates in file
  const handleUpload = async () => {
    if (!file || !batchName || !academicYear) return;
    setUploading(true);
    setUploadMsg("");
    try {
      const records = await parseFile(file);
      if (!Array.isArray(records) || records.length === 0) throw new Error("No records found in file");
      // Prepare batch write
      const batch = writeBatch(db);
      const certsCol = collection(db, "certificates");
      const now = Timestamp.now();
      const uploadId = `${batchName}_${academicYear}_${Date.now()}`;
      // Add each record to Firestore batch
      records.forEach((rec, idx) => {
        const certData = {
          ...rec,
          batchName,
          academicYear,
          uploadId,
          verifiedAt: now,
          verificationResult: verifyCertificate(rec),
        };
        const certDoc = doc(certsCol); // generate new doc ref
        batch.set(certDoc, certData);
      });
      await batch.commit();
      setUploadHistory([
        ...uploadHistory,
        {
          fileName: file.name,
          batchName,
          academicYear,
          date: new Date().toLocaleString(),
          total: records.length,
        },
      ]);
      setUploadMsg(`Uploaded and verified ${records.length} certificates.`);
    } catch (err) {
      setUploadMsg("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      setFile(null);
      setBatchName("");
      setAcademicYear("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #e3f0ff 0%, #fafdff 100%)" }}>
      <Header />
      <div style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "48px 16px 32px 16px" }}>
        <h1 style={{ textAlign: "center", fontSize: 38, fontWeight: 800, color: "#1976d2", marginBottom: 8, letterSpacing: 1, fontFamily: "serif" }}>Institution Portal</h1>
        <p style={{ textAlign: "center", fontSize: 20, color: "#444", marginBottom: 40, fontWeight: 500 }}>
          Manage bulk student record uploads and monitor institutional statistics for certificate verification
        </p>
        {/* Upload Section */}
        <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px 0 rgba(80,120,200,0.10)", padding: "36px 32px 32px 32px", marginBottom: 40 }}>
          <h2 style={{ color: "#1976d2", fontSize: 28, fontWeight: 700, marginBottom: 18, fontFamily: "serif" }}>Upload Student Records</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", marginBottom: 18 }}>
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleFileChange} style={{ fontSize: 16 }} />
            <input type="text" placeholder="Batch Name" value={batchName} onChange={e => setBatchName(e.target.value)} style={{ padding: "10px 14px", borderRadius: 8, border: "1.5px solid #b6c6e3", fontSize: 16, minWidth: 160 }} />
            <input type="text" placeholder="Academic Year" value={academicYear} onChange={e => setAcademicYear(e.target.value)} style={{ padding: "10px 14px", borderRadius: 8, border: "1.5px solid #b6c6e3", fontSize: 16, minWidth: 140 }} />
            <button onClick={handleUpload} disabled={uploading} style={{ background: uploading ? "#b6c6e3" : "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)", color: "#fff", fontWeight: 700, fontSize: 18, border: "none", borderRadius: 10, padding: "12px 32px", cursor: uploading ? "not-allowed" : "pointer", boxShadow: "0 2px 8px rgba(25,118,210,0.10)", transition: "background 0.2s, box-shadow 0.2s", letterSpacing: 1 }}>{uploading ? "Uploading..." : "Verify Records"}</button>
          </div>
          <div style={{ color: "#888", fontSize: 15, marginBottom: 8 }}>
            Accepted file types: CSV, Excel. Each row should represent a certificate record.
          </div>
          {uploadMsg && <div style={{ color: uploadMsg.startsWith("Upload failed") ? "#e74c3c" : "#27c99a", fontWeight: 600, marginTop: 10 }}>{uploadMsg}</div>}
        </div>
        {/* Upload History */}
        <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px 0 rgba(80,120,200,0.10)", padding: "32px 24px 32px 24px", marginBottom: 40 }}>
          <h2 style={{ color: "#1976d2", fontSize: 24, fontWeight: 700, marginBottom: 18, fontFamily: "serif" }}>Upload History</h2>
          {uploadHistory.length === 0 ? (
            <div style={{ color: "#888", fontSize: 16 }}>No uploads yet.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#fff", borderRadius: 12, overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#fafdff" }}>
                  <th style={thTdStyle}>File Name</th>
                  <th style={thTdStyle}>Batch Name</th>
                  <th style={thTdStyle}>Academic Year</th>
                  <th style={thTdStyle}>Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {uploadHistory.map((item, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? "#f6f8fa" : "#fff" }}>
                    <td style={thTdStyle}>{item.fileName}</td>
                    <td style={thTdStyle}>{item.batchName}</td>
                    <td style={thTdStyle}>{item.academicYear}</td>
                    <td style={thTdStyle}>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Certificate Verifications Section */}
        <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px 0 rgba(80,120,200,0.10)", padding: "32px 24px 32px 24px" }}>
          <h2 style={{ color: "#1976d2", fontSize: 24, fontWeight: 700, marginBottom: 18, fontFamily: "serif" }}>Certificate Verifications from Your Institution</h2>
          <div style={{ color: "#888", fontSize: 16 }}>
            (This section will show a table of certificate verifications for your institution. Data integration required.)
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const thTdStyle = {
  padding: "12px 8px",
  textAlign: "left",
  verticalAlign: "middle",
  borderBottom: "1px solid #eaeaea",
};
