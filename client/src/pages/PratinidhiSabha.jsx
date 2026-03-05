import { useState, useEffect, useRef } from "react";
import NepaleseBuilding from "../assets/NepaleseBuilding.jpg";

// ── Data ──────────────────────────────────────────────────────────────────────
const NATIONAL_STATS = {
  totalSeats: 275,
  pratyaksha: 165,
  samanupatiक: 110,
  totalVoters: 17999380,
  male: 8924130,
  female: 9062480,
  other: 12770,
  votingCenters: 10893,
  districts: 77,
  candidates: 2412,
  registered_parties: 120,
};

const PARTIES = [
  { name: "नेकपा (एमाले)",        short: "UML", color: "#C0392B", seats: 78,  votes: 27.9 },
  { name: "नेपाली कांग्रेस",      short: "NC",  color: "#1A3A6B", seats: 89,  votes: 26.6 },
  { name: "नेकपा (माओवादी)",      short: "MC",  color: "#8B0000", seats: 32,  votes: 11.0 },
  { name: "राष्ट्रिय स्वतन्त्र",  short: "RSP", color: "#D4AF37", seats: 20,  votes: 10.7 },
  { name: "जनता समाजवादी",        short: "JSP", color: "#2E7D32", seats: 12,  votes: 6.6  },
  { name: "राप्रपा नेपाल",        short: "RPP", color: "#6A1B9A", seats: 14,  votes: 5.5  },
  { name: "अन्य दलहरू",           short: "OTH", color: "#546E7A", seats: 30,  votes: 11.7 },
];

const ELECTION_TIMELINE = [
  { date: "२०८२ फाल्गुन २१", event: "मतदान दिन",               done: false, active: true  },
  { date: "२०८२ फाल्गुन २२", event: "मत गणना सुरु",            done: false, active: false },
  { date: "२०८२ फाल्गुन २३", event: "अन्तिम नतिजा प्रकाशन",   done: false, active: false },
];

const FAQS = [
  {
    q: "प्रतिनिधि सभा भनेको के हो?",
    a: "प्रतिनिधि सभा नेपालको संघीय संसदको तल्लो सदन हो। यसमा कुल २७५ सदस्य हुन्छन् — १६५ प्रत्यक्ष निर्वाचित र ११० समानुपातिक।",
  },
  {
    q: "प्रत्यक्ष र समानुपातिक फरक के हो?",
    a: "प्रत्यक्षमा आफ्नो निर्वाचन क्षेत्रबाट एक उम्मेदवार छान्नुहुन्छ। समानुपातिकमा पार्टीलाई मत दिनुहुन्छ — पार्टीले पाएको मत प्रतिशत अनुसार सिट पाउँछ।",
  },
  {
    q: "मतदान गर्न के चाहिन्छ?",
    a: "मतदाता परिचयपत्र वा राष्ट्रिय परिचयपत्र अनिवार्य छ। उमेर १८ वर्ष पूरा भएको र मतदाता नामावलीमा नाम दर्ता भएको हुनु पर्छ।",
  },
  {
    q: "के अनलाइन मतदान सुरक्षित छ?",
    a: "हो। यो प्रणाली End-to-End Encryption, Blockchain Verification र Multi-factor Authentication प्रयोग गर्छ। प्रत्येक मत unique token मार्फत verify हुन्छ।",
  },
];

// ── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString("ne-NP")}</span>;
}

// ── Helper Components ─────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div className="mb-8">
      <h2
        style={{
          fontFamily: "'Tiro Devanagari Hindi', serif",
          fontSize: "clamp(1.5rem,3vw,2.2rem)",
          color: "#FDFAF5",
          marginBottom: 8,
        }}
      >
        {children}
      </h2>
      <div style={{ width: 50, height: 3, background: "#D4AF37", borderRadius: 2 }} />
    </div>
  );
}

function StatCard({ icon, label, val, suffix = "" }) {
  return (
    <div
      className="rounded-lg p-5 text-center"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}
    >
      <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#D4AF37" }}>
        <Counter target={val} />
        {suffix}
      </div>
      <div style={{ color: "rgba(253,250,245,0.5)", fontSize: "0.75rem", marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PratinidhiSabha() {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq]     = useState(null);

  const tabs = [
    { id: "overview",  label: "सिंहावलोकन"        },
    { id: "seats",     label: "सिट विवरण"          },
    { id: "voters",    label: "मतदाता तथ्याङ्क"    },
    { id: "parties",   label: "दल स्थिति"           },
    { id: "timeline",  label: "समयरेखा"             },
    { id: "faq",       label: "FAQ"                 },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0A0E1A 0%, #162035ff 100%)",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
        color: "#FDFAF5",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Noto+Sans+Devanagari:wght@300;400;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.35); }
          50%      { box-shadow: 0 0 0 8px rgba(212,175,55,0);  }
        }
        .fade-up  { animation: fadeUp 0.7s ease forwards; }
        .dot-live { animation: pulse 1.8s ease infinite;  }
        ::-webkit-scrollbar       { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 3px; }
      `}</style>

      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden h-screen w-full flex items-center justify-center text-center"
        style={{
          background: `linear-gradient(rgba(10,14,26,0.65), rgba(10,14,26,0.85)), url("${NepaleseBuilding}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* BG diagonal pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(187,184,176,0.02) 40px,rgba(187,184,176,0.02) 41px)",
          }}
        />

        {/* Hero text — centred */}
        <div className="relative z-10 fade-up px-4">
          <h1
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "#D4AF37",
              marginBottom: 8,
            }}
          >
            संघीय संसद
          </h1>
          <h2
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              fontSize: "clamp(1.2rem,3vw,2rem)",
              color: "#FDFAF5",
              marginBottom: 16,
            }}
          >
            प्रतिनिधि सभा — देशव्यापी निर्वाचन
          </h2>
          <p style={{ color: "rgba(253,250,245,0.5)", fontSize: "0.85rem", letterSpacing: 3 }}>
            HOUSE OF REPRESENTATIVES · FEDERAL PARLIAMENT OF NEPAL
          </p>
        </div>
      </div>
      {/* ── Hero Banner END ── */}

      {/* ── Tabs ── */}
      <div
        className="sticky top-0 z-40 overflow-x-auto"
        style={{ background: "#0D1525", borderBottom: "1px solid rgba(212,175,55,0.2)" }}
      >
        <div className="flex min-w-max px-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="px-5 py-4 text-sm whitespace-nowrap cursor-pointer"
              style={{
                background: "none",
                border: "none",
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                color: activeTab === t.id ? "#D4AF37" : "rgba(253,250,245,0.5)",
                borderBottom: activeTab === t.id ? "2px solid #D4AF37" : "2px solid transparent",
                transition: "all 0.2s",
                letterSpacing: 0.5,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="fade-up">
            <SectionTitle>सिंहावलोकन</SectionTitle>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: "🏛️", label: "कुल सिट",       val: NATIONAL_STATS.totalSeats,    suffix: ""  },
                { icon: "🗳️", label: "कुल मतदाता",     val: NATIONAL_STATS.totalVoters,   suffix: ""  },
                { icon: "🏘️", label: "मतदान केन्द्र",  val: NATIONAL_STATS.votingCenters, suffix: ""  },
                { icon: "👤", label: "उम्मेदवार",       val: NATIONAL_STATS.candidates,    suffix: "+" },
              ].map((s) => (
                <StatCard key={s.label} icon={s.icon} label={s.label} val={s.val} suffix={s.suffix} />
              ))}
            </div>

            {/* About text */}
            <div
              className="rounded-lg p-6 mb-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <h3
                style={{
                  fontFamily: "'Tiro Devanagari Hindi', serif",
                  color: "#D4AF37",
                  fontSize: "1.3rem",
                  marginBottom: 14,
                }}
              >
                प्रतिनिधि सभा के हो?
              </h3>
              <p style={{ color: "rgba(253,250,245,0.78)", lineHeight: 2, fontSize: "0.95rem" }}>
                प्रतिनिधि सभा नेपालको{" "}
                <span style={{ color: "#F0D060", fontWeight: 600 }}>संघीय संसदको तल्लो सदन</span> हो।
                नेपालको संविधान २०७२ अनुसार यसमा{" "}
                <span style={{ color: "#F0D060", fontWeight: 600 }}>२७५ सदस्य</span> हुन्छन्। यो सदन{" "}
                <span style={{ color: "#F0D060", fontWeight: 600 }}>५ वर्षको कार्यकाल</span>का लागि
                निर्वाचित हुन्छ। प्रतिनिधि सभाले कानून बनाउने, बजेट पास गर्ने र सरकारलाई जवाफदेही
                बनाउने महत्त्वपूर्ण भूमिका निभाउँछ।
              </p>
            </div>

            {/* Key facts grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "निर्वाचन प्रणाली",
                  points: ["प्रत्यक्ष: १६५ सिट", "समानुपातिक: ११० सिट", "मिश्रित निर्वाचन प्रणाली"],
                },
                {
                  title: "योग्यता",
                  points: ["नेपाली नागरिकता अनिवार्य", "उमेर: कम्तिमा २५ वर्ष", "मतदाता नामावलीमा दर्ता"],
                },
                {
                  title: "महत्त्वपूर्ण अधिकार",
                  points: ["कानून निर्माण", "बजेट स्वीकृति", "सरकार गठन/विघटन"],
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-lg p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <h4 style={{ color: "#D4AF37", fontWeight: 700, marginBottom: 12, fontSize: "0.95rem" }}>
                    {f.title}
                  </h4>
                  {f.points.map((p) => (
                    <div key={p} className="flex items-center gap-2 mb-2">
                      <span style={{ color: "#D4AF37", fontSize: "0.7rem" }}>▶</span>
                      <span style={{ color: "rgba(253,250,245,0.75)", fontSize: "0.87rem" }}>{p}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEATS */}
        {activeTab === "seats" && (
          <div className="fade-up">
            <SectionTitle>सिट विवरण</SectionTitle>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Seat breakdown */}
              <div
                className="rounded-lg p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <h3
                  style={{
                    color: "#D4AF37",
                    fontFamily: "'Tiro Devanagari Hindi', serif",
                    fontSize: "1.2rem",
                    marginBottom: 20,
                  }}
                >
                  सिट वितरण
                </h3>
                {[
                  { label: "प्रत्यक्ष निर्वाचित", val: 165, total: 275, color: "#C0392B" },
                  { label: "समानुपातिक",           val: 110, total: 275, color: "#1A3A6B" },
                ].map((s) => (
                  <div key={s.label} className="mb-5">
                    <div className="flex justify-between mb-2">
                      <span style={{ color: "rgba(253,250,245,0.8)", fontSize: "0.9rem" }}>{s.label}</span>
                      <span style={{ color: "#D4AF37", fontWeight: 700 }}>{s.val} सिट</span>
                    </div>
                    <div
                      className="rounded-full overflow-hidden"
                      style={{ height: 10, background: "rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(s.val / s.total) * 100}%`,
                          background: s.color,
                          transition: "width 1s ease",
                        }}
                      />
                    </div>
                    <div style={{ color: "rgba(253,250,245,0.4)", fontSize: "0.75rem", marginTop: 4 }}>
                      {((s.val / s.total) * 100).toFixed(1)}% कुल सिटको
                    </div>
                  </div>
                ))}

                <div
                  className="mt-6 p-4 rounded"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <div className="flex justify-between">
                    <span style={{ color: "#D4AF37", fontWeight: 700 }}>कुल सिट</span>
                    <span style={{ color: "#D4AF37", fontWeight: 800, fontSize: "1.2rem" }}>२७५</span>
                  </div>
                  <div style={{ color: "rgba(253,250,245,0.5)", fontSize: "0.8rem", marginTop: 4 }}>
                    बहुमतका लागि: १३८ सिट आवश्यक
                  </div>
                </div>
              </div>

              {/* Constituency info */}
              <div
                className="rounded-lg p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <h3
                  style={{
                    color: "#D4AF37",
                    fontFamily: "'Tiro Devanagari Hindi', serif",
                    fontSize: "1.2rem",
                    marginBottom: 20,
                  }}
                >
                  निर्वाचन क्षेत्र
                </h3>
                {[
                  { label: "कुल निर्वाचन क्षेत्र", val: "१६५"        },
                  { label: "कुल जिल्ला",            val: "७७"         },
                  { label: "कुल प्रदेश",             val: "७"          },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span style={{ color: "rgba(253,250,245,0.65)", fontSize: "0.88rem" }}>{r.label}</span>
                    <span style={{ color: "#F0D060", fontWeight: 600, fontSize: "0.88rem" }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Majority info */}
            <div
              className="rounded-lg p-5"
              style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)" }}
            >
              <p style={{ color: "rgba(253,250,245,0.85)", fontSize: "0.92rem", lineHeight: 1.9 }}>
                <span style={{ color: "#F0D060", fontWeight: 700 }}>⚖️ सरकार गठनका लागि:</span> कुल २७५
                सिटमध्ये कम्तिमा{" "}
                <span style={{ color: "#F0D060", fontWeight: 700 }}>१३८ सिट</span> (बहुमत) चाहिन्छ।
                कुनै दलले एक्लै बहुमत नपाएमा{" "}
                <span style={{ color: "#F0D060", fontWeight: 700 }}>गठबन्धन सरकार</span> बन्न सक्छ।
              </p>
            </div>
          </div>
        )}

        {/* VOTERS */}
        {activeTab === "voters" && (
          <div className="fade-up">
            <SectionTitle>मतदाता तथ्याङ्क</SectionTitle>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: "👥", label: "कुल मतदाता",   val: NATIONAL_STATS.totalVoters, color: "#D4AF37" },
                { icon: "👨", label: "पुरुष मतदाता", val: NATIONAL_STATS.male,        color: "#1A3A6B" },
                { icon: "👩", label: "महिला मतदाता", val: NATIONAL_STATS.female,      color: "#C0392B" },
                { icon: "⚧️", label: "अन्य",          val: NATIONAL_STATS.other,       color: "#2E7D32" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-5 text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}40` }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>
                    <Counter target={s.val} />
                  </div>
                  <div style={{ color: "rgba(253,250,245,0.55)", fontSize: "0.78rem", marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Gender bar */}
            <div
              className="rounded-lg p-6 mb-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <h3 style={{ color: "#D4AF37", fontWeight: 700, marginBottom: 16 }}>लैङ्गिक अनुपात</h3>
              <div className="flex rounded-full overflow-hidden mb-3" style={{ height: 24 }}>
                <div
                  style={{
                    width: `${(NATIONAL_STATS.male / NATIONAL_STATS.totalVoters) * 100}%`,
                    background: "#1A3A6B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {((NATIONAL_STATS.male / NATIONAL_STATS.totalVoters) * 100).toFixed(1)}%
                </div>
                <div
                  style={{
                    width: `${(NATIONAL_STATS.female / NATIONAL_STATS.totalVoters) * 100}%`,
                    background: "#C0392B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {((NATIONAL_STATS.female / NATIONAL_STATS.totalVoters) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm" style={{ background: "#1A3A6B" }} />
                  <span style={{ color: "rgba(253,250,245,0.6)", fontSize: "0.82rem" }}>पुरुष</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm" style={{ background: "#C0392B" }} />
                  <span style={{ color: "rgba(253,250,245,0.6)", fontSize: "0.82rem" }}>महिला</span>
                </div>
              </div>
            </div>

            {/* Extra stats */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "मतदान केन्द्र",         val: "१०,८९३",    icon: "📍" },
                { label: "दर्ता जिल्ला",           val: "७७",        icon: "🗺️" },
                { label: "पहिलोपटक मतदाता",       val: "२१,४५,०००", icon: "🆕" },
                { label: "विदेशमा दर्ता",          val: "२,३४,५६७",  icon: "✈️" },
                { label: "अपाङ्गता भएका",          val: "१,२३,४५०",  icon: "♿" },
                { label: "ज्येष्ठ नागरिक (६५+)",   val: "८,९०,२३४",  icon: "👴" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 rounded-lg p-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)" }}
                >
                  <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                  <div>
                    <div style={{ color: "#F0D060", fontWeight: 700, fontSize: "1.1rem" }}>{s.val}</div>
                    <div style={{ color: "rgba(253,250,245,0.55)", fontSize: "0.78rem" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PARTIES */}
        {activeTab === "parties" && (
          <div className="fade-up">
            <SectionTitle>दल स्थिति — सिट वितरण</SectionTitle>

            <div
              className="mb-6 rounded-lg p-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <p style={{ color: "rgba(253,250,245,0.55)", fontSize: "0.82rem" }}>
                * तलको तथ्याङ्क पछिल्लो निर्वाचन परिणाममा आधारित अनुमानित हो।
              </p>
            </div>

            {/* Parliament bar */}
            <div
              className="rounded-lg p-6 mb-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <h3 style={{ color: "#D4AF37", fontWeight: 700, marginBottom: 16 }}>संसदमा सिट अनुपात</h3>
              <div className="flex rounded-full overflow-hidden mb-4" style={{ height: 32 }}>
                {PARTIES.map((p) => (
                  <div
                    key={p.short}
                    title={`${p.name}: ${p.seats} सिट`}
                    style={{ width: `${(p.seats / 275) * 100}%`, background: p.color, transition: "width 1s ease" }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {PARTIES.map((p) => (
                  <div key={p.short} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm" style={{ background: p.color }} />
                    <span style={{ color: "rgba(253,250,245,0.65)", fontSize: "0.75rem" }}>{p.short}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Party list */}
            <div className="flex flex-col gap-3">
              {PARTIES.map((p, i) => (
                <div
                  key={p.short}
                  className="rounded-lg p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.color}30` }}
                >
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: p.color, color: "#fff" }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div style={{ color: "#FDFAF5", fontWeight: 700, fontSize: "0.95rem" }}>{p.name}</div>
                        <div style={{ color: "rgba(253,250,245,0.45)", fontSize: "0.72rem", letterSpacing: 1 }}>
                          {p.short}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: p.color, fontWeight: 800, fontSize: "1.3rem" }}>{p.seats}</div>
                      <div style={{ color: "rgba(253,250,245,0.45)", fontSize: "0.72rem" }}>सिट</div>
                    </div>
                  </div>
                  <div
                    className="rounded-full overflow-hidden"
                    style={{ height: 8, background: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(p.seats / 275) * 100}%`, background: p.color }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span style={{ color: "rgba(253,250,245,0.4)", fontSize: "0.75rem" }}>
                      मत प्रतिशत: {p.votes}%
                    </span>
                    <span style={{ color: "rgba(253,250,245,0.4)", fontSize: "0.75rem" }}>
                      {((p.seats / 275) * 100).toFixed(1)}% सिट
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-6 p-4 rounded-lg text-center"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              <span style={{ color: "#D4AF37", fontSize: "0.88rem" }}>
                कुल दर्ता दल: <strong>{NATIONAL_STATS.registered_parties}</strong> &nbsp;|&nbsp;
                बहुमत: <strong>१३८ सिट</strong> आवश्यक
              </span>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        {activeTab === "timeline" && (
          <div className="fade-up">
            <SectionTitle>निर्वाचन समयरेखा</SectionTitle>
            <div className="relative max-w-2xl mx-auto">
              <div
                className="absolute left-6 top-0 bottom-0 w-0.5"
                style={{ background: "rgba(212,175,55,0.2)" }}
              />
              {ELECTION_TIMELINE.map((t, i) => (
                <div key={i} className="relative flex gap-6 mb-8 pl-14">
                  <div className="absolute left-0 w-12 flex items-center justify-center">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: t.done ? "#D4AF37" : t.active ? "#4CAF50" : "rgba(255,255,255,0.1)",
                        border: `2px solid ${t.done ? "#D4AF37" : t.active ? "#4CAF50" : "rgba(255,255,255,0.2)"}`,
                        boxShadow: t.active ? "0 0 12px rgba(76,175,80,0.5)" : "none",
                      }}
                    >
                      {t.done   && <span style={{ color: "#0A0E1A", fontSize: "0.6rem", fontWeight: 900 }}>✓</span>}
                      {t.active && <span className="w-2 h-2 rounded-full" style={{ background: "#4CAF50" }} />}
                    </div>
                  </div>
                  <div
                    className="flex-1 rounded-lg p-4"
                    style={{
                      background: t.active ? "rgba(76,175,80,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${t.active ? "rgba(76,175,80,0.3)" : "rgba(212,175,55,0.12)"}`,
                    }}
                  >
                    <div style={{ color: "#D4AF37", fontSize: "0.78rem", marginBottom: 4, letterSpacing: 1 }}>
                      {t.date}
                    </div>
                    <div
                      style={{
                        color: t.done ? "rgba(253,250,245,0.5)" : "#FDFAF5",
                        fontWeight: t.active ? 700 : 400,
                        fontSize: "0.95rem",
                      }}
                    >
                      {t.event}
                      {t.active && (
                        <span
                          className="ml-2 text-xs px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(76,175,80,0.2)", color: "#4CAF50" }}
                        >
                          आज
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === "faq" && (
          <div className="fade-up max-w-3xl mx-auto">
            <SectionTitle>बारम्बार सोधिने प्रश्नहरू</SectionTitle>
            <div className="flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden"
                  style={{ border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                    style={{
                      background: openFaq === i ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.03)",
                      border: "none",
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                    }}
                  >
                    <span style={{ color: "#FDFAF5", fontWeight: 600, fontSize: "0.95rem" }}>{f.q}</span>
                    <span style={{ color: "#D4AF37", fontSize: "1.2rem", marginLeft: 12, flexShrink: 0 }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-6 py-4"
                      style={{
                        background: "rgba(212,175,55,0.05)",
                        borderTop: "1px solid rgba(212,175,55,0.15)",
                      }}
                    >
                      <p style={{ color: "rgba(253,250,245,0.75)", lineHeight: 1.9, fontSize: "0.9rem" }}>
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      {/* ── Tab Content END ── */}

    </div>
    // ── Root div END ──
  );
}