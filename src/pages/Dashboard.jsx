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
    <div style={{  minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <h1 textAlign="centre">Admin Dashboard</h1>
        <p>Monitor system-wide certificate verification activities and manage institutional partnerships across India</p>
      
      {/* Cards with icons and descriptions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 24,
          marginBottom: 60,
        }}
      >
        {statsCardsData.map(({ id, value, label, color, icon }) => {
          const isRed = color === "#e74c3c";
          return (
            <div
              key={id}
              style={{
                backgroundColor: color,
                borderRadius: 12,
                padding: 24,
                boxShadow: isRed ? "0 6px 16px rgba(231,76,60,0.3)" : "0 6px 16px rgba(39,201,154,0.25)",
                color: "white",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 12,
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 20 }}>{icon}</span>
                {label}
              </div>
              <div
                style={{
                  fontSize: isRed ? 26 : 48,
                  fontWeight: isRed ? 900 : 900,
                  marginBottom: 8,
                  lineHeight: 1,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
                title={typeof value === "string" ? value : undefined}
              >
                {value}
              </div>
              {isRed ? (
                <div style={{ fontSize: 14, opacity: 0.85, userSelect: "text" }}>
                  Fraudulent attempts
                </div>
              ) : label === "Institutions Onboarded" ? null : (
                <div style={{ fontSize: 14, opacity: 0.85, userSelect: "text" }}>{label}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Verification Logs Section */}
      <div style={{ maxWidth: 900, margin: "0 auto", paddingBottom: 40 }}>
        <h2 style={{ marginBottom: 8, fontWeight: "bold", fontSize: 22 }}>Verification Logs</h2>
        <p style={{ marginBottom: 24, color: "#666" }}>
          Real-time verification activities and system monitoring
        </p>
        <div style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
          <label htmlFor="filter">Filter by Result:</label>
          <select
            id="filter"
            name="filter"
            style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
          >
            <option>All Results</option>
            <option>Success</option>
            <option>Forgery Detected</option>
          </select>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setPage(1)} // Just example, no real filtering logic here
          >
            Apply Filter
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
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
              <tr key={idx}>
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
                      backgroundColor: "#007bff",
                      border: "none",
                      color: "#fff",
                      padding: "6px 8px",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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

        {/* Pagination Controls */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24, gap: 12 }}>
          <button
            style={paginationButtonStyle}
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
                backgroundColor: page === num + 1 ? "#007bff" : "#fff",
                color: page === num + 1 ? "#fff" : "#000",
                borderColor: page === num + 1 ? "#007bff" : "#ccc",
                fontWeight: page === num + 1 ? "600" : "normal",
              }}
              onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
          <button
            style={paginationButtonStyle}
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;