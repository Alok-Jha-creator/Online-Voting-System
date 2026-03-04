import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nepalFlag from "../assets/nepal flag.png";

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 5 + 2,
  duration: `${Math.random() * 12 + 8}s`,
  delay: `${Math.random() * 8}s`,
  color: ["#D4AF37", "#C0392B", "#1B4F2A", "rgba(255,255,255,0.5)"][
    Math.floor(Math.random() * 4)
  ],
}));

export default function IntroPage({ onEnter }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden px-5"
      style={{
        background: "linear-gradient(160deg, #0D1B3E 0%, #1A0A0A 50%, #0A1A0D 100%)",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Noto+Sans+Devanagari:wght@300;400;600;700&display=swap');

        @keyframes floatUp {
          0%   { transform: translateY(110vh) rotate(0deg);   opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-10vh) rotate(720deg); opacity: 0; }
        }
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(212,175,55,0); }
        }
        .btn-glow    { animation: btnGlow 2.5s ease infinite; }
        .float-up    { animation: floatUp var(--dur) var(--delay) linear infinite; }
      `}</style>

      {/* ── Particles ── */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full float-up opacity-0"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              "--dur": p.duration,
              "--delay": p.delay,
            }}
          />
        ))}
      </div>

      {/* ── Emblem ── */}
      <img src={nepalFlag} alt="Emblem" className="w-22 h-22 rounded-full mt-2 z-2" />

      {/* ── Top Divider ── */}
      <div
        className="h-px my-2 z-10"
        style={{
          width: visible ? 340 : 0,
          maxWidth: "90vw",
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          transition: "width 0.9s ease",
        }}
      />

      {/* ── Main Title ── */}
      <h1
        className="text-center z-10 my-2"
        style={{
          fontFamily: "'Tiro Devanagari Hindi', serif",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          color: "#D4AF37",
          letterSpacing: 2,
          textShadow: "0 0 40px rgba(212,175,55,0.4)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
        }}
      >
        नेपाल निर्वाचन आयोग
      </h1>

      {/* ── Subtitle ── */}
      <p
        className="text-center z-10 mb-1"
        style={{
          fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
          color: "#F5EFE0",
          letterSpacing: 6,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s ease 0.7s, transform 0.9s ease 0.7s",
        }}
      >
        Nepal Election Commission
      </p>

      {/* ── Bottom Divider ── */}
      <div
        className="h-px my-2 z-10"
        style={{
          width: visible ? 340 : 0,
          maxWidth: "40vw",
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          transition: "width 0.9s ease 0.6s",
        }}
      />

      {/* ── Message Box ── */}
      <div
        className="relative mt-2 z-10 text-center rounded-sm"
        style={{
          maxWidth: 660,
          width: "100%",
          padding: "28px 36px",
          border: "1px solid rgba(212,175,55,0.3)",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 1.2s, transform 1s ease 1.2s",
        }}
      >
        {/* Corner top-left */}
        <span
          className="absolute top-0 left-0 w-5 h-5"
          style={{ borderTop: "2px solid #D4AF37", borderLeft: "2px solid #D4AF37", opacity: 0.6 }}
        />
        {/* Corner bottom-right */}
        <span
          className="absolute bottom-0 right-0 w-5 h-5"
          style={{ borderBottom: "2px solid #D4AF37", borderRight: "2px solid #D4AF37", opacity: 0.6 }}
        />

        <p
          className="leading-loose font-light"
          style={{ color: "rgba(253,250,245,0.92)", fontSize: "clamp(0.88rem, 1.8vw, 1rem)" }}
        >
          <span className="font-semibold" style={{ color: "#F0D060" }}>
            सम्पूर्ण नेपालवासीहरूलाई
          </span>{" "}
          निर्वाचन आयोगको तर्फबाट हार्दिक स्वागत तथा शुभकामना छ।
          <br /><br />
          यो{" "}
          <span className="font-semibold" style={{ color: "#F0D060" }}>
            अनलाइन मतदान प्रणाली
          </span>{" "}
          मार्फत तपाईंले घरबाटै आफ्नो मतदान गर्न सक्नुहुन्छ। आफ्नो मतदाता
          परिचयपत्र नम्बर तयार राख्नुहोस् र{" "}
          <span className="font-bold" style={{ color: "#F0D060" }}>
            आफ्नो अधिकार प्रयोग गर्नुहोस्।
          </span>
          <br /><br />
          <em style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.88rem" }}>
            मतदान तपाईंको अधिकार हो — यसलाई सदुपयोग गर्नुहोस्।
          </em>
        </p>

        <p
          className="mt-4"
          style={{ fontSize: "0.8rem", color: "rgba(212,175,55,0.65)", letterSpacing: 1 }}
        >
          मतदान मिति: २०८१ मंसिर १५ — २०८१ मंसिर १५ &nbsp;|&nbsp; VOTING DATE: DEC 1, 2024
        </p>
      </div>

      {/* ── Enter Button ── */}
      <EnterButton visible={visible} onEnter={onEnter} />

      {/* ── Nepal Flag Stripe ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 5,
          background:
            "linear-gradient(90deg, #C0392B 0%, #C0392B 33%, #fff 33%, #fff 66%, #1B4F2A 66%, #1B4F2A 100%)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

function EnterButton({ visible, onEnter }) {
  const [hovered, setHovered] = useState(false);

  return ( <Link to="/home">
    <button
      onClick={onEnter}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="mt-3 mb-5 px-2 py-4 font-semibold rounded-sm z-8 btn-glow cursor-pointer"
      style={{
        border: "2px solid #D4AF37",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
        fontSize: "1rem",
        letterSpacing: 2,
        background: hovered ? "#D4AF37" : "transparent",
        color: hovered ? "#0A0E1A" : "#D4AF37",
        transition: "background 0.3s, color 0.3s, opacity 1s ease 2s, transform 1s ease 2s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",

      }}
    >
      मतदानमा प्रवेश गर्नुहोस् &nbsp;→
    </button>
    </Link>
  );
}