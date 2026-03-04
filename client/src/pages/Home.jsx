import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
    <section
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(192,57,43,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(26,58,107,0.22) 0%, transparent 60%), linear-gradient(180deg, #0A0E1A 0%, #0D1525 100%)",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Noto+Sans+Devanagari:wght@300;400;600;700;800&display=swap');

        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.35); }
          50%       { box-shadow: 0 0 0 8px rgba(212,175,55,0); }
        }
        .badge-pulse { animation: badgePulse 2s ease infinite; }
      `}</style>

      {/* Background diagonal pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,175,55,0.025) 40px, rgba(212,175,55,0.025) 41px)",
        }}
      />

      {/* Content */}
      <div className="text-center max-w-3xl relative z-10">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 badge-pulse"
          style={{
            border: "1px solid rgba(212,175,55,0.4)",
            background: "rgba(212,175,55,0.08)",
            color: "#D4AF37",
            fontSize: "0.78rem",
            letterSpacing: "3px",
          }}
        >
          🗳️ &nbsp; अनलाइन मतदान खुला छ
        </div>

        {/* Main Heading */}
        <h1
          className="mb-6 leading-snug"
          style={{
            fontFamily: "'Tiro Devanagari Hindi', serif",
            fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
            color: "#FDFAF5",
          }}
        >
          आफ्नो{" "}
          <span style={{ color: "#D4AF37" }}>मत</span>
          {" "}दिनुहोस्,
          <br />
          नेपालको भविष्य{" "}
          <span style={{ color: "#D4AF37" }}>बनाउनुहोस्</span>
        </h1>

        {/* Description */}
        <p
          className="mb-10 leading-relaxed mx-auto"
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
            color: "rgba(253,250,245,0.72)",
            maxWidth: 520,
          }}
        >
          नेपाल निर्वाचन आयोगको अधिकृत अनलाइन मतदान प्रणालीमा स्वागत छ।
          आफ्नो मतदाता परिचयपत्र प्रयोग गरी सुरक्षित तरिकाले मतदान गर्नुहोस्।
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <PrimaryBtn onClick={() => navigate("/vote")}>
            अहिले मतदान गर्नुहोस्
          </PrimaryBtn>
          <SecondaryBtn onClick={() => navigate("/how-to")}>
            कसरी मतदान गर्ने?
          </SecondaryBtn>
        </div>
        
      </div>
    </section>
    <div
  className="w-full grid grid-cols-2 md:grid-cols-4 gap-0"
  style={{ background: "linear-gradient(90deg, #922B21, #C0392B, #922B21)" }}
>
  {[
    { number: "१७५", label: "निर्वाचन क्षेत्र" },
    { number: "१८१६८२३०", label: "करोड मतदाता" },
    { number: "१२०+", label: "दल सहभागी" },
    { number: "१००%", label: "सुरक्षित एन्क्रिप्टेड" },
  ].map((stat, i) => (
    <div
      key={i}
      className="flex flex-col items-center justify-center py-5 px-4"
      style={{
        borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none",
      }}
    >
      <span
        className="font-bold"
        style={{
          fontFamily: "'Tiro Devanagari Hindi', serif",
          fontSize: "clamp(1.6rem, 3vw, 2rem)",
          color: "#fff",
        }}
      >
        {stat.number}
      </span>
      <span
        className="mt-1"
        style={{
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.78)",
          letterSpacing: "1px",
        }}
      >
        {stat.label}
      </span>
    </div>
  ))}
</div>
    </>
  );
}

function PrimaryBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-4 font-bold rounded-sm cursor-pointer"
      style={{
        background: "#C0392B",
        color: "#fff",
        border: "none",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
        fontSize: "1rem",
        letterSpacing: "1px",
        boxShadow: "0 4px 20px rgba(192,57,43,0.45)",
        transition: "background 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#922B21";
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 8px 30px rgba(192,57,43,0.55)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "#C0392B";
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 4px 20px rgba(192,57,43,0.45)";
      }}
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-4 font-semibold rounded-sm cursor-pointer"
      style={{
        background: "transparent",
        color: "#D4AF37",
        border: "2px solid #D4AF37",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
        fontSize: "1rem",
        letterSpacing: "1px",
        transition: "background 0.25s, transform 0.25s",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(212,175,55,0.1)";
        e.target.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "transparent";
        e.target.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}