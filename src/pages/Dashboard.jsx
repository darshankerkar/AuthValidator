import React, { useState, useEffect } from "react";
import { FaCertificate, FaCheckCircle, FaExclamationCircle, FaUniversity, FaEye } from "react-icons/fa";
import { Header } from "../components/Header";
import { db, auth } from "../firebase/config";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

// No dummy base stats here — runtime values are computed from `logs` for the signed-in user

// No more dummy data. We'll fetch from Firestore.

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
  const [logs, setLogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logsPerPage = 5;

  // Derived stats from logs
  const forgedCount = logs.filter(l => l.verificationResult === "Forgery Detected").length;
  const successCount = logs.filter(l => l.verificationResult === "Success").length;
  const totalVerified = logs.length;

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Fetch logs for current user
  useEffect(() => {
    if (!user) {
      setLogs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchLogs = async () => {
      try {
        const certsRef = collection(db, "certificates");
        // Assuming each certificate has a field 'email' for the uploader
        const q = query(certsRef, where("email", "==", user.email), orderBy("verifiedAt", "desc"));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setLogs(data);
        } catch (error) {
          console.error("Error fetching logs:", error);
          setLogs([]);
        } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [user]);

  // Filter logs based on filterResult
  const filteredLogs =
    filterResult === "All Results"
      ? logs
      : logs.filter((log) => log.verificationResult === filterResult);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice((page - 1) * logsPerPage, page * logsPerPage);

  // Build runtime stats cards and filter out Institutions (we don't track that here)
  const statsCardsData = [
    { id: 1, value: totalVerified, label: "Certificates Verified", color: "#27c99a", icon: <FaCertificate /> },
    { id: 2, value: successCount, label: "Successful Verifications", color: "#27c99a", icon: <FaCheckCircle /> },
    { id: 3, value: forgedCount, label: "Forgeries Detected", color: "#e74c3c", icon: <FaExclamationCircle /> },
    // Institutions count is not tracked here; omit from view
  ];

  const filteredStatsCards = statsCardsData; // already tailored

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", display: "flex", flexDirection: "column", fontFamily: 'Inter, sans-serif' }}>
      <Header />
      <div style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "40px 16px 32px 16px" }}>
        <h1 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, color: "#1a237e", marginBottom: 8, letterSpacing: 0.5, fontFamily: "Inter, sans-serif" }}>Admin Dashboard</h1>
        <p style={{ textAlign: "center", fontSize: 18, color: "#444", marginBottom: 36, fontWeight: 500, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
          Monitor certificate verification activities and manage institutional partnerships across India
        </p>
        {/* Stats Cards */}
        <div className="stats-cards" style={{ marginBottom: 48 }}>
          {filteredStatsCards.map(({ id, value, label, color, icon }) => {
            const isRed = color === "#e74c3c";
            return (
              <div
                key={id}
                className={`stat-card ${isRed ? 'stat-card--red' : ''}`}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 2px 12px rgba(60,80,120,0.07)",
                  color: isRed ? "#e74c3c" : "#1976d2",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 220,
                  minHeight: 140,
                  border: isRed ? "1.5px solid #e74c3c22" : "1.5px solid #1976d222",
                  transition: "box-shadow 0.2s, border 0.2s",
                  padding: "28px 32px 24px 32px"
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.92 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, letterSpacing: 0.2, color: "#222" }}>{label}</div>
                <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 2, lineHeight: 1, color: isRed ? "#e74c3c" : "#1976d2" }}>{loading ? '...' : value}</div>
                {isRed ? (
                  <div style={{ fontSize: 13, opacity: 0.85, userSelect: "text", color: "#e74c3c" }}>Fraudulent attempts</div>
                ) : null}
              </div>
            );
          })}
        </div>
        {/* Verification Logs Section */}
        <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(60,80,120,0.07)", padding: "28px 20px 32px 20px" }}>
          <h2 style={{ marginBottom: 8, fontWeight: 800, fontSize: 22, color: "#1a237e", letterSpacing: 0.2 }}>Verification Logs</h2>
          <p style={{ marginBottom: 18, color: "#666", fontSize: 15, fontWeight: 500 }}>
            Real-time verification activities and system monitoring
          </p>
          <div style={{ marginBottom: 14, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <label htmlFor="filter" style={{ fontWeight: 600, fontSize: 15 }}>Filter by Result:</label>
            <select
              id="filter"
              name="filter"
              style={{ padding: 7, borderRadius: 6, border: "1.2px solid #b6c6e3", fontSize: 15, fontWeight: 500 }}
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
            >
              <option>All Results</option>
              <option>Success</option>
              <option>Forgery Detected</option>
            </select>
            <button
              style={{
                padding: "7px 16px",
                background: "#1976d2",
                color: "#fff",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: 0.2,
                boxShadow: "0 1px 4px rgba(25,118,210,0.08)"
              }}
              onClick={() => setPage(1)}
            >
              Apply
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, background: "#fff", borderRadius: 10, overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#f6f8fa" }}>
                  <th style={thTdStyle}>User</th>
                  <th style={thTdStyle}>Certificate</th>
                  <th style={thTdStyle}>Result</th>
                  <th style={thTdStyle}>Date & Time</th>
                  <th style={thTdStyle}>IP Address</th>
                  <th style={thTdStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", color: "#888", fontSize: 16 }}>Loading...</td></tr>
                ) : paginatedLogs.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", color: "#888", fontSize: 16 }}>No verification logs found.</td></tr>
                ) : (
                  paginatedLogs.map((log, idx) => (
                    <tr key={log.id || idx} style={{ background: idx % 2 === 0 ? "#fafdff" : "#fff" }}>
                      <td style={thTdStyle}>{log.email || "-"}</td>
                      <td style={thTdStyle}>{log.certificateName || log.certificate || "-"}</td>
                      <td style={thTdStyle} title={log.verificationResult}>
                        <span style={{ marginRight: 6 }}>
                          {log.verificationResult === "Success" ? <FaCheckCircle style={{ color: "#27c99a" }} /> : <FaExclamationCircle style={{ color: "#e74c3c" }} />}
                        </span>
                        {log.verificationResult}
                      </td>
                      <td style={thTdStyle}>{log.verifiedAt && log.verifiedAt.toDate ? log.verifiedAt.toDate().toLocaleString() : "-"}</td>
                      <td style={thTdStyle}>{log.ip || "-"}</td>
                      <td style={thTdStyle}>
                        <button
                          title="View Details"
                          style={{
                            background: "#f6f8fa",
                            border: "1.2px solid #1976d2",
                            color: "#1976d2",
                            padding: "6px 10px",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontSize: 15,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "none",
                            transition: "background 0.15s, color 0.15s, border 0.15s"
                          }}
                          onClick={() => alert(`Viewing details of ${log.certificateName || log.certificate || log.id}`)}
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 22, gap: 10 }}>
            <button
              style={{ ...paginationButtonStyle, fontWeight: 700, fontSize: 15, borderRadius: 7, background: "#f6f8fa", color: "#1976d2", border: "1.2px solid #b6c6e3" }}
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
                  background: page === num + 1 ? "#1976d2" : "#fff",
                  color: page === num + 1 ? "#fff" : "#1976d2",
                  borderColor: page === num + 1 ? "#1976d2" : "#b6c6e3",
                  fontWeight: page === num + 1 ? "700" : "normal",
                  fontSize: 15,
                  borderRadius: 7
                }}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
              </button>
            ))}
            <button
              style={{ ...paginationButtonStyle, fontWeight: 700, fontSize: 15, borderRadius: 7, background: "#f6f8fa", color: "#1976d2", border: "1.2px solid #b6c6e3" }}
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