import React, { useState } from "react";
import { FaCertificate, FaCheckCircle, FaExclamationCircle, FaUniversity, FaEye } from "react-icons/fa";
import { Header  } from "../components/Header";

const statsCardsData = [
  { id: 1, value: 5, label: "Certificates Verified", color: "#27c99a", icon: <FaCertificate /> },
  { id: 2, value: 0, label: "Successful Verifications", color: "#27c99a", icon: <FaCheckCircle /> },
  { id: 3, value: "Expression: forgery_attempts_count", label: "Forgeries Detected", color: "#e74c3c", icon: <FaExclamationCircle /> },
  { id: 4, value: 2, label: "Institutions Onboarded", color: "#27c99a", icon: <FaUniversity /> },
];

const verificationLogsData = [
  {
    user: "diploma_bravo.docx",
    certificate: "certificate_alpha.pdf",
    result: "Forgery Detected",
    resultIcon: <FaExclamationCircle style={{ color: "#e74c3c" }} />,
    dateTime: "Sep 5, 2025 8:40 am",
    ip: "192.168.1.101",
  },
  {
    user: "john_doe.docx",
    certificate: "certificate_beta.pdf",
    result: "Success",
    resultIcon: <FaCheckCircle style={{ color: "#27c99a" }} />,
    dateTime: "Sep 3, 2025 7:35 am",
    ip: "192.168.1.100",
  },
  // Add more verification logs as needed
];

const thTdStyle = {
  padding: "12px 8px",
  textAlign: "left",
  verticalAlign: "middle",
  borderBottom: "1px solid #eaeaea",
};

const paginationButtonStyle = {
  padding: "8px 14px",
  cursor: "pointer",
  borderRadius: 4,
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  userSelect: "none",
};

const Dashboard = () => {
  const [filterResult, setFilterResult] = useState("All Results");
  const [page, setPage] = useState(1);
  const totalPages = 3; // Example total pages for pagination

  // Filter logs based on filterResult
  const filteredLogs =
    filterResult === "All Results"
      ? verificationLogsData
      : verificationLogsData.filter((log) => log.result === filterResult);
      
      
        return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #e3f0ff 0%, #fafdff 100%)", display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: "40px 16px 32px 16px" }}>
        <h1 style={{ textAlign: "center", fontSize: 38, fontWeight: 800, color: "#1976d2", marginBottom: 8, letterSpacing: 1, fontFamily: "serif" }}>Admin Dashboard</h1>
        <p style={{ textAlign: "center", fontSize: 20, color: "#444", marginBottom: 40, fontWeight: 500 }}>
          Monitor system-wide certificate verification activities and manage institutional partnerships across India
        </p>
        {/* Cards with icons and descriptions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 28,
            marginBottom: 60,
          }}
        >
          {statsCardsData.map(({ id, value, label, color, icon }) => {
            const isRed = color === "#e74c3c";
            return (
              <div
                key={id}
                style={{
                  background: isRed
                    ? "linear-gradient(90deg, #e74c3c 0%, #ffb199 100%)"
                    : "linear-gradient(90deg, #27c99a 0%, #a4f8a2 100%)",
                  borderRadius: 16,
                  padding: 32,
                  boxShadow: isRed
                    ? "0 8px 32px rgba(231,76,60,0.13)"
                    : "0 8px 32px rgba(39,201,154,0.13)",
                  color: isRed ? "#fff" : "#222",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  minHeight: 160,
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{ fontSize: 38, marginBottom: 18, opacity: 0.9 }}>{icon}</div>
                <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8, letterSpacing: 0.5 }}>{label}</div>
                <div style={{ fontSize: 40, fontWeight: 900, marginBottom: 6, lineHeight: 1 }}>{value}</div>
                {isRed ? (
                  <div style={{ fontSize: 15, opacity: 0.85, userSelect: "text" }}>Fraudulent attempts</div>
                ) : label === "Institutions Onboarded" ? null : (
                  <div style={{ fontSize: 15, opacity: 0.85, userSelect: "text" }}>{label}</div>
                )}
              </div>
            );
          })}
        </div>
        {/* Verification Logs Section */}
        <div style={{ maxWidth: 1000, margin: "0 auto", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px 0 rgba(80,120,200,0.10)", padding: "32px 24px 40px 24px" }}>
          <h2 style={{ marginBottom: 8, fontWeight: 800, fontSize: 26, color: "#1976d2", letterSpacing: 0.5 }}>Verification Logs</h2>
          <p style={{ marginBottom: 24, color: "#666", fontSize: 16, fontWeight: 500 }}>
            Real-time verification activities and system monitoring
          </p>
          <div style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <label htmlFor="filter" style={{ fontWeight: 600 }}>Filter by Result:</label>
            <select
              id="filter"
              name="filter"
              style={{ padding: 8, borderRadius: 6, border: "1.5px solid #b6c6e3", fontSize: 16, fontWeight: 500 }}
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
            >
              <option>All Results</option>
              <option>Success</option>
              <option>Forgery Detected</option>
            </select>
            <button
              style={{
                padding: "8px 18px",
                background: "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)",
                color: "#fff",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: 0.5,
                boxShadow: "0 2px 8px rgba(25,118,210,0.10)"
              }}
              onClick={() => setPage(1)}
            >
              Apply Filter
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#fff", borderRadius: 12, overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#fafdff" }}>
                  <th style={thTdStyle}>User</th>
                  <th style={thTdStyle}>Certificate</th>
                  <th style={thTdStyle}>Result</th>
                  <th style={thTdStyle}>Date & Time</th>
                  <th style={thTdStyle}>IP Address</th>
                  <th style={thTdStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.slice((page - 1) * 5, page * 5).map((log, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? "#f6f8fa" : "#fff" }}>
                    <td style={thTdStyle}>{log.user}</td>
                    <td style={thTdStyle}>{log.certificate}</td>
                    <td style={thTdStyle} title={log.result}>
                      <span style={{ marginRight: 6 }}>{log.resultIcon}</span>
                      {log.result}
                    </td>
                    <td style={thTdStyle}>{log.dateTime}</td>
                    <td style={thTdStyle}>{log.ip}</td>
                    <td style={thTdStyle}>
                      <button
                        title="View Details"
                        style={{
                          background: "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)",
                          border: "none",
                          color: "#fff",
                          padding: "7px 10px",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontSize: 15,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(25,118,210,0.10)"
                        }}
                        onClick={() => alert(`Viewing details of ${log.user}`)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28, gap: 14 }}>
            <button
              style={{ ...paginationButtonStyle, fontWeight: 700, fontSize: 15, borderRadius: 8 }}
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                style={{
                  ...paginationButtonStyle,
                  background: page === num + 1 ? "linear-gradient(90deg, #1976d2 0%, #21c6f3 100%)" : "#fff",
                  color: page === num + 1 ? "#fff" : "#1976d2",
                  borderColor: page === num + 1 ? "#1976d2" : "#b6c6e3",
                  fontWeight: page === num + 1 ? "700" : "normal",
                  fontSize: 15,
                  borderRadius: 8
                }}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
              </button>
            ))}
            <button
              style={{ ...paginationButtonStyle, fontWeight: 700, fontSize: 15, borderRadius: 8 }}
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;