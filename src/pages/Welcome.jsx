import Footer from "../components/Footer";
import { Header } from "../components/Header";

function Welcome() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />

      {/* Hero Section */}
      <section
        className="w-full flex flex-col items-center justify-center text-center"
        style={{
          background: "linear-gradient(180deg, #2196f3 0%, #1e88e5 100%)",
          color: "#fff",
          padding: "64px 16px 80px 16px",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <div className="content1" style={{display:"flex",paddingLeft:"330px"}}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin :0,
            fontFamily: "serif",
          }}
        >
          Secure Certificate Verification for India
        </h1>
        </div>
        
        <p
          style={{
            fontSize: 25,
            maxWidth: 700,
            margin: "0 auto 32px auto",
            fontWeight: 400,
            lineHeight: 1.4,
            paddingTop: 30,
            paddingLeft: 30,
          }}
        >
          AuthValidator uses advanced AI and blockchain technology to instantly
          verify academic certificates, preventing fraud and ensuring institutional
          trust across Indian educational institutions.
        </p>
        <button
          style={{
            background: "#2ecc71",
            color: "#fff",
            fontWeight: 600,
            fontSize: 24,
            padding: "18px 48px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(44,204,113,0.08)",
            transition: "background 0.2s",
            marginLeft:550,
          }}
        >
          Verify Your Certificate Now
        </button>
      </section>

      {/* Trusted Section */}
      <section className="py-14 px-4">
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          {[1, 2, 3, 4].map((_, idx) => (
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
                boxShadow: "0 2px 12px rgba(39,201,154,0.08)",
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 48, fontWeight: 700 }}>5</span>
              <span style={{ fontSize: 20, fontWeight: 500 }}>
                Certificates Verified
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
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
        >
          Get Started Today
        </button>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Welcome;
