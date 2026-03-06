import { useNavigate } from "react-router-dom";

const QUICK_LINKS = {
  निर्वाचन: [
    { label: "प्रतिनिधि सभा"},
    { label: "प्रदेश सभा"},
    { label: "मतदान गर्नुस्", path: "/vote"             },
    { label: "नतिजा",         path: "/results"          },
  ],
  "मतदाता सेवा": [
    { label: "मतदाता दर्ता",      path: "https://election.gov.np/np/page/voter-list-db"  },
    { label: "नामावली हेर्नुस्",   path: "https://election.gov.np/np/page/voter-list-db"  },
    { label: "परिचयपत्र" },
    { label: "सहायता" },
  ],
  सम्पर्क: [
    { label: "हेल्पलाइन: १०७०",          path: null },
    { label: "info@election.gov.np",      path: null },
    { label: "कान्तिपथ, काठमाडौं",        path: null },
    { label: "आइत–शुक्र १०:०० – ५:००",    path: null },
  ],
};

const SOCIAL = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter/X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060A14" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        background: "#060A14",
        borderTop: "2px solid rgba(212,175,55,0.25)",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Noto+Sans+Devanagari:wght@300;400;600;700&display=swap');
        .footer-link:hover { color: #D4AF37 !important; }
        .social-btn:hover  { background: rgba(212,175,55,0.15) !important; border-color: #D4AF37 !important; color: #D4AF37 !important; }
      `}</style>

      {/* ── Main Footer Content ── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">

          {/* ── Logo + Description ── */}
          <div className="md:col-span-1">
            {/* Emblem */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: "1.5px solid #D4AF37", background: "rgba(212,175,55,0.08)" }}
              >
                <svg viewBox="0 0 100 100" className="w-7 h-7">
                  <path
                    d="M10,65 L25,35 L35,50 L50,20 L65,50 L75,35 L90,65 Z"
                    fill="none" stroke="#D4AF37" strokeWidth="6" strokeLinejoin="round"
                  />
                  <circle cx="50" cy="50" r="10" fill="none" stroke="#D4AF37" strokeWidth="4" />
                  <circle cx="50" cy="50" r="5" fill="#D4AF37" opacity="0.8" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Tiro Devanagari Hindi', serif",
                    fontSize: "1.05rem",
                    color: "#D4AF37",
                    lineHeight: 1.2,
                  }}
                >
                  नेपाल निर्वाचन आयोग
                </div>
                <div style={{ fontSize: "0.6rem", color: "rgba(212,175,55,0.55)", letterSpacing: 2 }}>
                  ELECTION COMMISSION · NEPAL
                </div>
              </div>
            </div>

            <p
              style={{
                color: "rgba(253,250,245,0.5)",
                fontSize: "0.82rem",
                lineHeight: 1.8,
                marginBottom: 20,
              }}
            >
              स्वतन्त्र, निष्पक्ष र विश्वसनीय निर्वाचनको सुनिश्चितता गर्ने नेपालको संवैधानिक निकाय।
            </p>

            {/* Social Icons */}
            <div className="flex gap-2 flex-wrap">
              {SOCIAL.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  className="social-btn w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(253,250,245,0.6)",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          {Object.entries(QUICK_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  color: "#D4AF37",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  letterSpacing: 2,
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                {section}
              </h4>
              <ul className="flex flex-col gap-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    {link.path ? (
                      <button
                        onClick={() => navigate(link.href)}
                        className="footer-link text-left cursor-pointer"
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(253,250,245,0.55)",
                          fontSize: "0.85rem",
                          fontFamily: "'Noto Sans Devanagari', sans-serif",
                          transition: "color 0.2s",
                          padding: 0,
                        }}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <span
                        style={{
                          color: "rgba(253,250,245,0.55)",
                          fontSize: "0.85rem",
                        }}
                      >
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* ── Divider ── */}
        <div
          className="my-10"
          style={{ height: 1, background: "rgba(212,175,55,0.15)" }}
        />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: "rgba(253,250,245,0.35)", fontSize: "0.78rem" }}>
            © २०८२ नेपाल निर्वाचन आयोग — सर्वाधिकार सुरक्षित
          </p>

          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="footer-link"
                style={{
                  color: "rgba(253,250,245,0.35)",
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <p style={{ color: "rgba(253,250,245,0.25)", fontSize: "0.72rem" }}>
            नेपाल सरकारको अधिकृत मतदान प्रणाली
          </p>
        </div>
      </div>

      {/* ── Nepal Flag Stripe ── */}
      <div
        style={{
          height: 5,
          background: "linear-gradient(90deg, #C0392B 0%, #C0392B 33%, #fff 33%, #fff 66%, #1B4F2A 66%, #1B4F2A 100%)",
          opacity: 0.6,
        }}
      />
    </footer>
  );
}