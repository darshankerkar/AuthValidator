import Footer from "../components/Footer";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import ModalLogin from "../components/ModalLogin";

function Welcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #e3f0ff 0%, #fafdff 100%)" }}>
      <Header />

      {/* Hero Section */}
      <section className="hero-section"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          background: "linear-gradient(120deg, #1976d2 0%, #21c6f3 100%)",
          color: "#fff",
          padding: "64px 12px",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          boxShadow: "0 8px 32px 0 rgba(80,120,200,0.13)",
        }}
      >
        <div className="hero-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1100, gap: 32 }}>
          <div className="hero-card" style={{ flex: 1, maxWidth: 640, background: "rgba(255,255,255,0.12)", borderRadius: 18, padding: 28, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <h1 className="hero-title"
              style={{
                fontWeight: 800,
                margin: 0,
                fontFamily: "serif",
                letterSpacing: 0.6,
                color: "#fff",
                lineHeight: 1.02,
              }}
            >
              Secure Certificate Verification for India
            </h1>
            <p className="hero-sub"
              style={{
                marginTop: 14,
                maxWidth: 680,
                fontWeight: 400,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              AuthValidator uses AI and blockchain to instantly verify academic certificates, prevent fraud, and restore trust across Indian institutions.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
              <button className="hero-cta"
                style={{
                  background: "linear-gradient(90deg, #2ecc71 0%, #27c99a 100%)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 18,
                  padding: "12px 20px",
                  borderRadius: 12,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(39,201,154,0.14)",
                  transition: "transform 0.12s ease, box-shadow 0.12s ease",
                }}
                onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'translateY(0)')}
                onClick={() => navigate('/verify-certificate')}
              >
                Verify Now
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.22)",
                  padding: "10px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 15,
                }}
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="hero-visual" style={{ width: 420, display: 'flex', justifyContent: 'center' }}>
            <div className="visual-card" style={{ width: 380, height: 260, background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 12px 40px rgba(10,30,60,0.12)' }}>
              <img src="/Screenshot_2025-09-13_012344-removebg-preview.png" style={{ width: 300, filter: 'drop-shadow(0 18px 40px rgba(10,30,60,0.12))' }} alt="illustration" />
            </div>
          </div>
        </div>
      </section>

<section className="stats-section py-14 px-4">
  <h2
    style={{
      textAlign: "center",
      fontSize: 36,
      fontWeight: 700,
      marginBottom: 40,
      fontFamily: "serif",
      color: "#222",
    }}
  >
    Trusted Across India
  </h2>

  <div className="stats-grid"
    style={{
      display: "flex",
      justifyContent: "center",
      gap: 32,
      flexWrap: "wrap",
    }}
  >
    {/* Data array with each card's stats */}
    {[
      {
        title: "Certificates Verified",
        values: [5], // can add multiple values if needed
      },
      {
        title: "Successful Verifications",
        values: [0],
      },
      {
        title: "Forgery Attempts Detected",
        values: [0],
      },
      {
        title: "Institutions Onboarded",
        values: [2],
      },
    ].map(({ title, values }, idx) => (
      <div
        key={idx}
        style={{
          background: "#27c99a",
          color: "#fff",
          borderRadius: 16,
          width: 260,
          minHeight: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
           boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)", // <-- shadow added
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          padding: 20,
          gap: 10,
        }}
      >
        {values.map((val, i) => (
          <span
            key={i}
            style={{
              fontSize: 48,
              fontWeight: 700,
              display: "block",
              lineHeight: 1,
            }}
          >
            {val}
          </span>
        ))}
        <span
          style={{
            fontSize: 20,
            fontWeight: 500,
            marginTop: 6,
            textAlign: "center",
          }}
        >
          {title}
        </span>
      </div>
    ))}
  </div>
</section>

      {/* Why Choose AuthValidator Section */}
      <section style={{ background: "#fff", padding: "64px 0 32px 0" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: 700,
            fontFamily: "serif",
            marginBottom: 40,
            color: "#222",
          }}
        >
          Why Choose AuthValidator?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          {/* Card 1 */}
          <div className="feature-card"
          style={{
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: 16,
            width: 370,
            minHeight: 210,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 24px",
             boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)", // <-- shadow added
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          >
            <div style={{ fontSize: 32, color: "#1976d2", marginBottom: 12 }}>
              <span role="img" aria-label="bolt">⚡</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, fontFamily: "serif", color: "#222" }}>
              Instant Verification
            </h3>
            <p style={{ fontSize: 18, color: "#333", margin: 0 }}>
              Get verification results in seconds using advanced AI algorithms trained specifically for Indian academic institutions and certificate formats.
            </p>
          </div>
          {/* Card 2 */}
          <div className="feature-card"
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 16,
              width: 370,
              minHeight: 210,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 24px",
               boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)", // <-- shadow added
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{ fontSize: 32, color: "#1976d2", marginBottom: 12 }}>
              <span role="img" aria-label="shield">🛡️</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, fontFamily: "serif", color: "#222" }}>
              Blockchain Security
            </h3>
            <p style={{ fontSize: 18, color: "#333", margin: 0 }}>
              Immutable records stored on blockchain ensure your verification results cannot be tampered with, providing ultimate security and trust.
            </p>
          </div>
          {/* Card 3 */}
          <div className="feature-card"
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 16,
              width: 370,
              minHeight: 210,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 24px",
               boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)", // <-- shadow added
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{ fontSize: 32, color: "#1976d2", marginBottom: 12 }}>
              <span role="img" aria-label="flag">🏳️</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, fontFamily: "serif", color: "#222" }}>
              Indian Standards Compliant
            </h3>
            <p style={{ fontSize: 18, color: "#333", margin: 0 }}>
              Built specifically for Indian educational institutions with support for regional languages, local formats, and Indian timezone settings.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ background: "#fff", padding: "64px 0 32px 0" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: 700,
            fontFamily: "serif",
            marginBottom: 40,
            color: "#222",
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 16,
              width: 370,
              minHeight: 210,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 24px",
               boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)", // <-- shadow added
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{
              background: "#1976d2",
              color: "#fff",
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
            }}>1</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, fontFamily: "serif", color: "#222" }}>
              Upload Certificate
            </h3>
            <p style={{ fontSize: 17, color: "#333", margin: 0 }}>
              Upload your academic certificate in PDF or image format.
            </p>
          </div>
          {/* Step 2 */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 16,
              width: 370,
              minHeight: 210,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 24px",
              boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)", // <-- shadow added
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div style={{
              background: "#1976d2",
              color: "#fff",
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
            }}>2</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, fontFamily: "serif", color: "#222" }}>
              AI Analysis
            </h3>
            <p style={{ fontSize: 17, color: "#333", margin: 0 }}>
              Our AI extracts and analyzes certificate data for authenticity.
            </p>
          </div>
          {/* Step 3 */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 16,
              width: 370,
              minHeight: 210,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 24px",
               boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)", // <-- shadow added
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          
            }}
          >
            <div style={{
              background: "#1976d2",
              color: "#fff",
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
            }}>3</div>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, fontFamily: "serif", color: "#222" }}>
              Get Results
            </h3>
            <p style={{ fontSize: 17, color: "#333", margin: 0 }}>
              Receive instant verification results with blockchain-backed proof.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        style={{
          background: "linear-gradient(180deg, #2196f3 0%, #1976d2 100%)",
          color: "#fff",
          MozBorderRadiusTopleft: 16,
          margin: "0",
          padding: "64px 0 64px 0",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 700,
            marginBottom: 24,
            fontFamily: "serif",
          }}
        >
          Ready to Verify Your Certificate?
        </h2>
        <p
          style={{
            fontSize: 26,
            maxWidth: 900,
            margin: "0 auto 32px auto",
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          Join thousands of students and institutions across India who trust AuthValidator for secure certificate verification.
        </p>
        <button
          style={{
            background: "#2ecc71",
            color: "#fff",
            fontWeight: 600,
            fontSize: 28,
            padding: "18px 48px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(44,204,113,0.08)",
            transition: "background 0.2s",
            marginTop: 10,
          }}
          onClick={() => {
            if (user) {
              navigate('/verify-certificate');
            } else {
              setShowLoginModal(true);
            }
          }}
        >
          Get Started Today
        </button>
        {showLoginModal && (
          <ModalLogin onClose={() => setShowLoginModal(false)} onSuccess={() => { setShowLoginModal(false); navigate('/verify-certificate'); }} />
        )}
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Welcome;
