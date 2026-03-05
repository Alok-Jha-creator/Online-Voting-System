import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/madesh1.jpg";
import img2 from "../assets/koshi1.jpg";

const SLIDES = [img1, img2];

// ── Data ──────────────────────────────────────────────────────────────────────
const PRADESH_STATS = {
  totalSeats: 550,
  pratyaksha: 330,
  samanupатik: 220,
  totalVoters: 17999380,
  male: 8924130,
  female: 9062480,
  other: 12770,
  votingCenters: 10893,
  districts: 77,
  provinces: 7,
};

const PRADESH_LIST = [
  {
    id: "koshi",
    name: "कोशी प्रदेश",
    capital: "विराटनगर",
    districts: 14,
    seats: 93,
    pratyaksha: 56,
    samanupатik: 37,
    totalVoters: 2856432,
    male: 1389234,
    female: 1458923,
    other: 8275,
    votingCenters: 1456,
    color: "#C0392B",
    emoji: "🏔️",
    path: "/pradesh/koshi",
  },
  {
    id: "madhesh",
    name: "मधेश प्रदेश",
    capital: "जनकपुरधाम",
    districts: 8,
    seats: 107,
    pratyaksha: 64,
    samanupатik: 43,
    totalVoters: 3524871,
    male: 1723456,
    female: 1793215,
    other: 8200,
    votingCenters: 1678,
    color: "#2E7D32",
    emoji: "🌾",
    path: "/pradesh/madhesh",
  },
  {
    id: "bagmati",
    name: "बागमती प्रदेश",
    capital: "हेटौंडा",
    districts: 13,
    seats: 110,
    pratyaksha: 66,
    samanupатik: 44,
    totalVoters: 4234567,
    male: 2089234,
    female: 2136543,
    other: 8790,
    votingCenters: 1923,
    color: "#1A3A6B",
    emoji: "🏙️",
    path: "/pradesh/bagmati",
  },
  {
    id: "gandaki",
    name: "गण्डकी प्रदेश",
    capital: "पोखरा",
    districts: 11,
    seats: 60,
    pratyaksha: 36,
    samanupатik: 24,
    totalVoters: 1678943,
    male: 812345,
    female: 861234,
    other: 5364,
    votingCenters: 876,
    color: "#6A1B9A",
    emoji: "🏞️",
    path: "/pradesh/gandaki",
  },
  {
    id: "lumbini",
    name: "लुम्बिनी प्रदेश",
    capital: "देउखुरी (बुटवल)",
    districts: 12,
    seats: 87,
    pratyaksha: 52,
    samanupатik: 35,
    totalVoters: 3123456,
    male: 1534567,
    female: 1580234,
    other: 8655,
    votingCenters: 1534,
    color: "#D4AF37",
    emoji: "☸️",
    path: "/pradesh/lumbini",
  },
  {
    id: "karnali",
    name: "कर्णाली प्रदेश",
    capital: "बिरेन्द्रनगर (सुर्खेत)",
    districts: 10,
    seats: 40,
    pratyaksha: 24,
    samanupатik: 16,
    totalVoters: 987654,
    male: 478234,
    female: 504321,
    other: 5099,
    votingCenters: 623,
    color: "#00695C",
    emoji: "🌿",
    path: "/pradesh/karnali",
  },
  {
    id: "sudurpaschim",
    name: "सुदूरपश्चिम प्रदेश",
    capital: "गोदावरी (कैलाली)",
    districts: 9,
    seats: 53,
    pratyaksha: 32,
    samanupатik: 21,
    totalVoters: 1593457,
    male: 897060,
    female: 728745,
    other: 7652,
    votingCenters: 803,
    color: "#E65100",
    emoji: "🌄",
    path: "/pradesh/sudurpaschim",
  },
];

const ELECTION_TIMELINE = [
  { date: "२०८२ फाल्गुन २१", event: "मतदान दिन",               done: false, active: true  },
  { date: "२०८२ फाल्गुन २२", event: "मत गणना सुरु",            done: false, active: false },
  { date: "२०८२ फाल्गुन २३", event: "अन्तिम नतिजा प्रकाशन",   done: false, active: false },
];

const FAQS = [
  {
    q: "प्रदेश सभा भनेको के हो?",
    a: "प्रदेश सभा नेपालको ७ वटा प्रदेशको आफ्नै विधायिका हो। यसले प्रदेश स्तरका कानून बनाउँछ र प्रदेश सरकार गठन गर्छ।",
  },
  {
    q: "प्रदेश सभामा कुल कति सिट छन्?",
    a: "सातै प्रदेश मिलाएर कुल ५५० सिट छन् — ३३० प्रत्यक्ष र २२० समानुपातिक। प्रत्येक प्रदेशको सिट संख्या भिन्न हुन्छ।",
  },
  {
    q: "प्रदेश सभा र प्रतिनिधि सभा फरक के हो?",
    a: "प्रतिनिधि सभा केन्द्र सरकारको लागि हो (देशव्यापी, २७५ सिट)। प्रदेश सभा प्रदेश सरकारको लागि हो (प्रदेश स्तर, कुल ५५० सिट)।",
  },
  {
    q: "मतदान गर्न के चाहिन्छ?",
    a: "मतदाता परिचयपत्र वा राष्ट्रिय परिचयपत्र अनिवार्य छ। उमेर १८ वर्ष पूरा र मतदाता नामावलीमा नाम दर्ता भएको हुनुपर्छ।",
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

// ── Pradesh Card ──────────────────────────────────────────────────────────────
function PradeshCard({ pradesh, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl p-5 cursor-pointer relative overflow-hidden"
      style={{
        background: hovered ? `${pradesh.color}18` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? pradesh.color : "rgba(255,255,255,0.1)"}`,
        transition: "all 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 30px ${pradesh.color}25` : "none",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 3, background: pradesh.color, opacity: hovered ? 1 : 0.4, transition: "opacity 0.25s" }}
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: `${pradesh.color}22`, border: `1px solid ${pradesh.color}50` }}
          >
            {pradesh.emoji}
          </span>
          <div>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: "#FDFAF5", fontWeight: 700, fontSize: "1rem" }}>
              {pradesh.name}
            </div>
            <div style={{ color: "rgba(253,250,245,0.45)", fontSize: "0.72rem" }}>
              राजधानी: {pradesh.capital}
            </div>
          </div>
        </div>
        <span style={{ color: pradesh.color, fontSize: "0.8rem", fontWeight: 700, opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}>
          हेर्नुस् →
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "कुल सिट", val: pradesh.seats },
          { label: "मतदाता",  val: `${(pradesh.totalVoters / 100000).toFixed(1)}L` },
          { label: "जिल्ला",  val: pradesh.districts },
        ].map((s) => (
          <div key={s.label} className="text-center rounded-lg py-2" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div style={{ color: pradesh.color, fontWeight: 800, fontSize: "1rem" }}>{s.val}</div>
            <div style={{ color: "rgba(253,250,245,0.45)", fontSize: "0.68rem", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PradeshSabha() {
  const [activeTab, setActiveTab]         = useState("overview");
  const [openFaq, setOpenFaq]             = useState(null);
  const [currentSlide, setCurrentSlide]   = useState(0); 
  const navigate                          = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "overview", label: "सिंहावलोकन"     },
    { id: "seats",    label: "सिट विवरण"       },
    { id: "voters",   label: "मतदाता तथ्याङ्क" },
    { id: "timeline", label: "समयरेखा"          },
    { id: "faq",      label: "FAQ"              },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0A0E1A 0%, #162035 100%)",
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
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        ::-webkit-scrollbar       { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 3px; }
      `}</style>

      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden h-screen py-20 px-6 text-center flex items-center justify-center"
        style={{
          background: `linear-gradient(rgba(10,14,26,0.65), rgba(10,14,26,0.85)), url("${SLIDES[currentSlide]}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "40vh",
          transition: "background-image 0.8s ease-in-out",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(223,222,218,0.02) 40px,rgba(223,222,218,0.02) 41px)",
          }}
        />
        <div className="relative z-10 fade-up">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs mb-6"
            style={{
              border: "1px solid rgba(212,175,55,0.4)",
              background: "rgba(212,175,55,0.08)",
              color: "#D4AF37",
              letterSpacing: 3,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#4CAF50" }} />
            मतदान खुला छ
          </span>
          <h1
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "#D4AF37",
              marginBottom: 8,
            }}
          >
            प्रदेश सभा
          </h1>
          <h2
            style={{
              fontFamily: "'Tiro Devanagari Hindi', serif",
              fontSize: "clamp(1.1rem,3vw,1.8rem)",
              color: "#FDFAF5",
              marginBottom: 12,
            }}
          >
            सातै प्रदेश — निर्वाचन
          </h2>
          <p style={{ color: "rgba(253,250,245,0.5)", fontSize: "0.82rem", letterSpacing: 3 }}>
            PROVINCIAL ASSEMBLY ELECTION · NEPAL
          </p>

          {/* Slide dots */}
          <div className="flex gap-2 justify-center mt-6">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="w-2 h-2 rounded-full cursor-pointer"
                style={{
                  background: currentSlide === i ? "#D4AF37" : "rgba(255,255,255,0.3)",
                  border: "none",
                  transition: "background 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* ── Hero END ── */}

      {/* ── Tabs ── */}
      <div
        className="sticky top-0 z-40 overflow-x-auto rounded-lg"
        style={{ background: "#0a193aff", borderBottom: "1px solid rgba(212,175,55,0.2)" }}
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

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="fade-up">
            <SectionTitle>सिंहावलोकन</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: "🏛️", label: "कुल सिट",      val: PRADESH_STATS.totalSeats,    suffix: "" },
                { icon: "🗳️", label: "कुल मतदाता",    val: PRADESH_STATS.totalVoters,   suffix: "" },
                { icon: "🏘️", label: "मतदान केन्द्र", val: PRADESH_STATS.votingCenters, suffix: "" },
                { icon: "🗺️", label: "प्रदेश संख्या", val: PRADESH_STATS.provinces,     suffix: "" },
              ].map((s) => (
                <StatCard key={s.label} icon={s.icon} label={s.label} val={s.val} suffix={s.suffix} />
              ))}
            </div>

            <div
              className="rounded-lg p-6 mb-10"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <h3 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: "#D4AF37", fontSize: "1.3rem", marginBottom: 14 }}>
                प्रदेश सभा के हो?
              </h3>
              <p style={{ color: "rgba(253,250,245,0.78)", lineHeight: 2, fontSize: "0.95rem" }}>
                प्रदेश सभा नेपालको{" "}
                <span style={{ color: "#F0D060", fontWeight: 600 }}>७ वटा प्रदेशको आफ्नै विधायिका</span> हो।
                नेपालको संविधान २०७२ अनुसार सातै प्रदेश मिलाएर कुल{" "}
                <span style={{ color: "#F0D060", fontWeight: 600 }}>५५० सदस्य</span> निर्वाचित हुन्छन्।
                प्रदेश सभाले{" "}
                <span style={{ color: "#F0D060", fontWeight: 600 }}>प्रदेश स्तरका कानून बनाउने</span>,
                बजेट पास गर्ने र प्रदेश सरकार गठन गर्ने महत्त्वपूर्ण भूमिका निभाउँछ।
              </p>
            </div>

            <div className="mb-4">
              <h3 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: "#FDFAF5", fontSize: "1.3rem", marginBottom: 6 }}>
                प्रदेश छान्नुहोस्
              </h3>
              <p style={{ color: "rgba(253,250,245,0.45)", fontSize: "0.82rem", marginBottom: 24 }}>
                विस्तृत जानकारीका लागि आफ्नो प्रदेशमा क्लिक गर्नुहोस्
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PRADESH_LIST.map((p) => (
                <PradeshCard key={p.id} pradesh={p} onClick={() => navigate(p.path)} />
              ))}
            </div>
          </div>
        )}

        {/* ── SEATS ── */}
        {activeTab === "seats" && (
          <div className="fade-up">
            <SectionTitle>सिट विवरण — प्रदेश अनुसार</SectionTitle>
            <div className="rounded-lg p-6 mb-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}>
              <h3 style={{ color: "#D4AF37", fontWeight: 700, marginBottom: 20, fontSize: "1.1rem" }}>
                कुल सिट वितरण (सातै प्रदेश)
              </h3>
              {[
                { label: "प्रत्यक्ष निर्वाचित", val: 330, total: 550, color: "#C0392B" },
                { label: "समानुपातिक",           val: 220, total: 550, color: "#1A3A6B" },
              ].map((s) => (
                <div key={s.label} className="mb-5">
                  <div className="flex justify-between mb-2">
                    <span style={{ color: "rgba(253,250,245,0.8)", fontSize: "0.9rem" }}>{s.label}</span>
                    <span style={{ color: "#D4AF37", fontWeight: 700 }}>{s.val} सिट</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 10, background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: `${(s.val / s.total) * 100}%`, background: s.color }} />
                  </div>
                  <div style={{ color: "rgba(253,250,245,0.4)", fontSize: "0.75rem", marginTop: 4 }}>
                    {((s.val / s.total) * 100).toFixed(1)}% कुल सिटको
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 rounded" style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <div className="flex justify-between">
                  <span style={{ color: "#D4AF37", fontWeight: 700 }}>कुल सिट (सातै प्रदेश)</span>
                  <span style={{ color: "#D4AF37", fontWeight: 800, fontSize: "1.2rem" }}>५५०</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>
              <div className="grid grid-cols-5 px-4 py-3 text-xs" style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37", letterSpacing: 1, fontWeight: 700 }}>
                <span>प्रदेश</span>
                <span className="text-center">प्रत्यक्ष</span>
                <span className="text-center">समानुपातिक</span>
                <span className="text-center">कुल सिट</span>
                <span className="text-center">जिल्ला</span>
              </div>
              {PRADESH_LIST.map((p, i) => (
                <div
                  key={p.id}
                  className="grid grid-cols-5 px-4 py-4 items-center cursor-pointer"
                  onClick={() => navigate(p.path)}
                  style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,175,55,0.07)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)")}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <span style={{ color: "#FDFAF5", fontSize: "0.88rem", fontWeight: 600 }}>{p.name}</span>
                  </div>
                  <span className="text-center" style={{ color: "#C0392B", fontWeight: 700 }}>{p.pratyaksha}</span>
                  <span className="text-center" style={{ color: "#1A3A6B", fontWeight: 700 }}>{p.samanupатik}</span>
                  <span className="text-center" style={{ color: "#D4AF37", fontWeight: 800 }}>{p.seats}</span>
                  <span className="text-center" style={{ color: "rgba(253,250,245,0.6)", fontSize: "0.85rem" }}>{p.districts}</span>
                </div>
              ))}
              <div className="grid grid-cols-5 px-4 py-4 items-center" style={{ background: "rgba(212,175,55,0.1)", borderTop: "2px solid rgba(212,175,55,0.3)" }}>
                <span style={{ color: "#D4AF37", fontWeight: 800 }}>जम्मा</span>
                <span className="text-center" style={{ color: "#C0392B", fontWeight: 800 }}>{PRADESH_LIST.reduce((a, p) => a + p.pratyaksha, 0)}</span>
                <span className="text-center" style={{ color: "#1A3A6B", fontWeight: 800 }}>{PRADESH_LIST.reduce((a, p) => a + p.samanupатik, 0)}</span>
                <span className="text-center" style={{ color: "#D4AF37", fontWeight: 800 }}>{PRADESH_LIST.reduce((a, p) => a + p.seats, 0)}</span>
                <span className="text-center" style={{ color: "rgba(253,250,245,0.6)", fontWeight: 700 }}>{PRADESH_LIST.reduce((a, p) => a + p.districts, 0)}</span>
              </div>
            </div>
            <p style={{ color: "rgba(253,250,245,0.35)", fontSize: "0.75rem", marginTop: 10 }}>
              * प्रदेशको नाममा क्लिक गर्दा विस्तृत जानकारी हेर्न सकिन्छ।
            </p>
          </div>
        )}

        {/* ── VOTERS ── */}
        {activeTab === "voters" && (
          <div className="fade-up">
            <SectionTitle>मतदाता तथ्याङ्क</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: "👥", label: "कुल मतदाता",   val: PRADESH_STATS.totalVoters, color: "#D4AF37" },
                { icon: "👨", label: "पुरुष मतदाता", val: PRADESH_STATS.male,        color: "#1A3A6B" },
                { icon: "👩", label: "महिला मतदाता", val: PRADESH_STATS.female,      color: "#C0392B" },
                { icon: "⚧️", label: "अन्य",          val: PRADESH_STATS.other,       color: "#2E7D32" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}40` }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>
                    <Counter target={s.val} />
                  </div>
                  <div style={{ color: "rgba(253,250,245,0.55)", fontSize: "0.78rem", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg p-6 mb-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.15)" }}>
              <h3 style={{ color: "#D4AF37", fontWeight: 700, marginBottom: 16 }}>लैङ्गिक अनुपात</h3>
              <div className="flex rounded-full overflow-hidden mb-3" style={{ height: 24 }}>
                <div style={{ width: `${(PRADESH_STATS.male / PRADESH_STATS.totalVoters) * 100}%`, background: "#1A3A6B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#fff", fontWeight: 600 }}>
                  {((PRADESH_STATS.male / PRADESH_STATS.totalVoters) * 100).toFixed(1)}%
                </div>
                <div style={{ width: `${(PRADESH_STATS.female / PRADESH_STATS.totalVoters) * 100}%`, background: "#C0392B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#fff", fontWeight: 600 }}>
                  {((PRADESH_STATS.female / PRADESH_STATS.totalVoters) * 100).toFixed(1)}%
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

            <h3 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: "#FDFAF5", fontSize: "1.1rem", marginBottom: 16 }}>
              प्रदेश अनुसार मतदाता
            </h3>
            <div className="flex flex-col gap-3">
              {PRADESH_LIST.map((p) => (
                <div key={p.id} className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,175,55,0.12)" }}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: "1.2rem" }}>{p.emoji}</span>
                      <span style={{ color: "#FDFAF5", fontWeight: 700, fontSize: "0.92rem" }}>{p.name}</span>
                    </div>
                    <span style={{ color: "#D4AF37", fontWeight: 800 }}>{p.totalVoters.toLocaleString("ne-NP")}</span>
                  </div>
                  <div className="flex rounded-full overflow-hidden" style={{ height: 6 }}>
                    <div style={{ width: `${(p.male / p.totalVoters) * 100}%`, background: "#1A3A6B" }} />
                    <div style={{ width: `${(p.female / p.totalVoters) * 100}%`, background: "#C0392B" }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span style={{ color: "rgba(253,250,245,0.4)", fontSize: "0.72rem" }}>पु: {p.male.toLocaleString("ne-NP")}</span>
                    <span style={{ color: "rgba(253,250,245,0.4)", fontSize: "0.72rem" }}>म: {p.female.toLocaleString("ne-NP")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TIMELINE ── */}
        {activeTab === "timeline" && (
          <div className="fade-up">
            <SectionTitle>निर्वाचन समयरेखा</SectionTitle>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: "rgba(212,175,55,0.2)" }} />
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
                    style={{ background: t.active ? "rgba(76,175,80,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${t.active ? "rgba(76,175,80,0.3)" : "rgba(212,175,55,0.12)"}` }}
                  >
                    <div style={{ color: "#D4AF37", fontSize: "0.78rem", marginBottom: 4, letterSpacing: 1 }}>{t.date}</div>
                    <div style={{ color: t.done ? "rgba(253,250,245,0.5)" : "#FDFAF5", fontWeight: t.active ? 700 : 400, fontSize: "0.95rem" }}>
                      {t.event}
                      {t.active && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(76,175,80,0.2)", color: "#4CAF50" }}>
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

        {/* ── FAQ ── */}
        {activeTab === "faq" && (
          <div className="fade-up max-w-3xl mx-auto">
            <SectionTitle>बारम्बार सोधिने प्रश्नहरू</SectionTitle>
            <div className="flex flex-col gap-3">
              {FAQS.map((f, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                    style={{ background: openFaq === i ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.03)", border: "none", fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                  >
                    <span style={{ color: "#FDFAF5", fontWeight: 600, fontSize: "0.95rem" }}>{f.q}</span>
                    <span style={{ color: "#D4AF37", fontSize: "1.2rem", marginLeft: 12, flexShrink: 0 }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 py-4" style={{ background: "rgba(212,175,55,0.05)", borderTop: "1px solid rgba(212,175,55,0.15)" }}>
                      <p style={{ color: "rgba(253,250,245,0.75)", lineHeight: 1.9, fontSize: "0.9rem" }}>{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}