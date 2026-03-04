import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="w-full px-8 flex items-center justify-between h-16 sticky top-0 z-50"
      style={{
        background: "linear-gradient(90deg, #0D2247, #0F2040, #0D2247)",
        borderBottom: "2px solid #D4AF37",
        boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Noto+Sans+Devanagari:wght@300;400;600;700&display=swap');
      `}</style>

      {/* ── Logo Left ── */}
      <div className="flex items-center gap-3">
        {/* Emblem SVG */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ border: "1.5px solid #D4AF37", background: "rgba(212,175,55,0.08)" }}
        >
          <svg viewBox="0 0 100 100" className="w-7 h-7">
            <path
              d="M10,65 L25,35 L35,50 L50,20 L65,50 L75,35 L90,65 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <circle cx="50" cy="50" r="10" fill="none" stroke="#D4AF37" strokeWidth="4" />
            <circle cx="50" cy="50" r="5" fill="#D4AF37" opacity="0.8" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col leading-tight">
          <span
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              fontSize: "1.1rem",
              color: "#D4AF37",
            }}
          >
            निर्वाचन आयोग
          </span>
          <span
            style={{
              fontSize: "0.62rem",
              color: "rgba(212,175,55,0.65)",
              letterSpacing: "2px",
            }}
          >
            ELECTION COMMISSION · NEPAL
          </span>
        </div>
      </div>

      {/* ── Nav Links Right (Desktop) ── */}
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {[
          { label: "गृहपृष्ठ",        to: "/" },
          { label: "मतदान गर्नुहोस्", to: "/vote" },
          { label: "कसरी मतदान गर्ने?", to: "/how-to" },
          { label: "परिणाम",           to: "/results" },
        ].map((link) => (
          <NavLink key={link.to} to={link.to} label={link.label} />
        ))}
      </ul>

      {/* ── Hamburger (Mobile) ── */}
      <button
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-6 h-0.5"
            style={{ background: "#D4AF37" }}
          />
        ))}
      </button>

      {/* ── Mobile Dropdown ── */}
      {menuOpen && (
        <ul
          className="absolute top-16 left-0 right-0 flex flex-col list-none m-0 p-4 gap-2 md:hidden"
          style={{
            background: "#0D2247",
            borderBottom: "2px solid #D4AF37",
          }}
        >
          {[
            { label: "गृहपृष्ठ",          to: "/" },
            { label: "मतदान गर्नुहोस्",   to: "/vote" },
            { label: "कसरी मतदान गर्ने?", to: "/how-to" },
            { label: "परिणाम",             to: "/results" },
          ].map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "rgba(253,250,245,0.85)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  display: "block",
                  padding: "8px 12px",
                  borderRadius: 4,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

function NavLink({ to, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: hovered ? "#D4AF37" : "rgba(253,250,245,0.8)",
          textDecoration: "none",
          fontSize: "0.88rem",
          letterSpacing: "1px",
          transition: "color 0.2s",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
        }}
      >
        {label}
      </Link>
    </li>
  );
}