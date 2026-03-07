import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NepalFlag from "../assets/nepal-flag.png";

const NAV_LINKS = [
  { label: "गृहपृष्ठ",          to: "/home"    },
  { label: "मतदान गर्नुहोस्",   to: "/vote"    },
  { label: "कसरी मतदान गर्ने?", to: "/how-to"  },
  { label: "परिणाम",             to: "/results" },
];

function NavLink({ to, label }) {
  const { pathname } = useLocation();
  const isActive     = pathname === to;
  const [hovered, setHovered] = useState(false);

  return (
    <li style={{ listStyle: "none", position: "relative" }}>
      <Link
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          color: isActive ? "#D4AF37" : hovered ? "#F0D060" : "rgba(253,250,245,0.75)",
          textDecoration: "none",
          fontSize: "0.88rem",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          padding: "6px 0",
          display: "block",
          transition: "color 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Link>
      <span style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 2,
        borderRadius: 2,
        background: "linear-gradient(90deg, #D4AF37, #F0D060)",
        transform: isActive || hovered ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.25s ease",
        transformOrigin: "left",
      }} />
    </li>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Noto+Sans+Devanagari:wght@300;400;600;700;800&display=swap');

        @keyframes slideDown {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* Desktop — hamburger लुकाउने */
        .hamburger-btn { display: none !important; }
        .desktop-nav   { display: flex !important; }

        /* Mobile — hamburger देखाउने, desktop nav लुकाउने */
        @media (max-width: 768px) {
          .hamburger-btn { display: flex !important; }
          .desktop-nav   { display: none !important; }
        }

        .mob-menu { animation: slideDown 0.2s ease forwards; }
        .mob-link:hover { background: rgba(212,175,55,0.08) !important; color: #D4AF37 !important; }
        .vote-cta:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 22px rgba(192,57,43,0.55) !important;
          background: linear-gradient(135deg, #E04535, #922B21) !important;
        }
      `}</style>

      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: 64,
        background: "linear-gradient(90deg, #070D1C 0%, #0D2247 45%, #0D2247 55%, #070D1C 100%)",
        borderBottom: "1.5px solid rgba(212,175,55,0.4)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
        boxSizing: "border-box",
      }}>

        {/* ── Logo (Left) ── */}
        <Link to="/home" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <div style={{
            width: 42, height: 42,
            borderRadius: "50%",
            border: "2px solid #D4AF37",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0 12px rgba(212,175,55,0.3)",
          }}>
            <img src={NepalFlag} alt="Nepal" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", lineHeight:1 }}>
            <span style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              fontSize: "1.05rem",
              color: "#D4AF37",
              marginBottom: 3,
            }}>
              निर्वाचन आयोग
            </span>
            <span style={{
              fontSize: "0.55rem",
              color: "rgba(212,175,55,0.5)",
              letterSpacing: "2.5px",
            }}>
              ELECTION COMMISSION · NEPAL
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav (Right) ── */}
        <ul
          className="desktop-nav"
          style={{ listStyle:"none", margin:0, padding:0, alignItems:"center", gap:32 }}
        >
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} label={l.label} />
          ))}

          {/* Divider */}
          <li style={{ width:1, height:20, background:"rgba(212,175,55,0.25)", listStyle:"none", flexShrink:0 }} />

          {/* CTA Button */}
          <li style={{ listStyle:"none" }}>
            <Link
              to="/vote"
              className="vote-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 18px",
                borderRadius: 6,
                background: "linear-gradient(135deg, #C0392B 0%, #7B241C 100%)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontWeight: 600,
                boxShadow: "0 3px 14px rgba(192,57,43,0.4)",
                border: "1px solid rgba(255,100,80,0.2)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              🗳️ मतदान गर्नुस्
            </Link>
          </li>
        </ul>

        {/* ── Hamburger (Mobile only) ── */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background:"none", border:"none", cursor:"pointer",
            padding:6, flexDirection:"column", gap:5,
          }}
        >
          {[0,1,2].map((i) => (
            <span key={i} style={{
              display: "block", width:22, height:2,
              background: "#D4AF37", borderRadius:2,
              transition: "transform 0.25s, opacity 0.25s",
              transform:
                menuOpen && i === 0 ? "translateY(7px) rotate(45deg)"
                : menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>

        {/* ── Mobile Dropdown ── */}
        {menuOpen && (
          <div
            className="mob-menu"
            style={{
              position: "absolute",
              top: 64, right: 16,
              width: 220,
              background: "#0D1E3A",
              borderRadius: 10,
              border: "1px solid rgba(212,175,55,0.25)",
              boxShadow: "0 12px 36px rgba(0,0,0,0.7)",
              padding: "8px",
              zIndex: 100,
            }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="mob-link"
                style={{
                  color: "rgba(253,250,245,0.8)",
                  textDecoration: "none",
                  fontSize: "0.92rem",
                  display: "block",
                  padding: "10px 14px",
                  borderRadius: 6,
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  transition: "all 0.2s",
                  marginBottom: 2,
                }}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ height:1, background:"rgba(212,175,55,0.15)", margin:"6px 0" }} />
            <Link
              to="/vote"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                padding: "10px",
                borderRadius: 7,
                background: "linear-gradient(135deg, #C0392B, #7B241C)",
                color: "#fff",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontWeight: 600,
                boxShadow: "0 3px 12px rgba(192,57,43,0.4)",
              }}
            >
              🗳️ मतदान गर्नुस्
            </Link>
          </div>
        )}

      </nav>
    </>
  );
}