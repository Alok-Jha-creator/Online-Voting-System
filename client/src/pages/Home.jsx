import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Mountain from "../assets/image (5).jpg";

export default function Home() {
  const navigate = useNavigate();

  // ── Real-time clock ──
  const getNepaliDate = (date) => {
  const nepaliMonths = [
    "बैशाख","जेठ","असार","श्रावण","भाद्र","आश्विन",
    "कार्तिक","मंसिर","पुष","माघ","फाल्गुन","चैत्र"
  ];
  const nepaliDays = [
    "आइतबार","सोमबार","मंगलबार","बुधबार",
    "बिहीबार","शुक्रबार","शनिबार"
  ];

  // English to Nepali date conversion (approximate +56 years +8 months)
  const engYear  = date.getFullYear();
  const engMonth = date.getMonth(); // 0-11
  const engDay   = date.getDate();
  const dayName  = nepaliDays[date.getDay()];

  // Approximate BS year
  let bsYear  = engYear + 56;
  let bsMonth = engMonth + 9; // shift by ~8.5 months
  let bsDay   = engDay + 17;

  if (bsMonth >= 12) { bsMonth -= 12; bsYear += 1; }
  if (bsDay > 30)    { bsDay -= 30;   bsMonth += 1; }
  if (bsMonth >= 12) { bsMonth -= 12; bsYear += 1; }

  return `${toNepali(bsYear)} ${nepaliMonths[bsMonth]} ${toNepali(bsDay)}, ${dayName}`;
};


  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // अंग्रेजी number → नेपाली
  const toNepali = (n) => {
    const digits = ["०","१","२","३","४","५","६","७","८","९"];
    return String(n).padStart(2, "0").split("").map(d => digits[d] ?? d).join("");
  };

  const hours = toNepali(time.getHours());
  const mins  = toNepali(time.getMinutes());
  const secs  = toNepali(time.getSeconds());

  return (
    <>
      <section
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url("${Mountain}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&family=Noto+Sans+Devanagari:wght@300;400;600;700&display=swap');
          @keyframes badgePulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
            50%       { box-shadow: 0 0 0 8px rgba(212,175,55,0); }
          }
          @keyframes colonBlink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.3; }
          }
          .badge-pulse  { animation: badgePulse 2.8s ease infinite; }
          .colon-blink  { animation: colonBlink 1s ease infinite; }
        `}</style>

        {/* Background pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(212,175,55,0.025) 40px, rgba(212,175,55,0.025) 41px)",
          }}
        />

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

          {/* Heading */}
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

          {/* ── Clock (buttons को ठाउँमा) ── */}
          <div className="flex flex-col items-center gap-2 mt-2">

            {/* मिति */}
           <p style={{ color: "#D4AF37", fontSize: "1.05rem", letterSpacing: "2px" }}>
               📅&nbsp; {getNepaliDate(time)}
           </p>

            {/* घडी */}
            <div>
              {/* घण्टा */}
              <span
                style={{
                  fontFamily: "'Tiro Devanagari Hindi', serif",
                  fontSize: "clamp(2.2rem, 2vw, 1.5rem)",
                  color: "#fff",
                  letterSpacing: "4px",
                  minWidth: "2ch",
                  textAlign: "center",
                }}
              >
                {hours}
              </span>

              <span
                className="colon-blink"
                style={{ color: "#D4AF37", fontSize: "1.8rem", lineHeight: 1 }}
              >
                :
              </span>

              {/* मिनेट */}
              <span
                style={{
                  fontFamily: "'Tiro Devanagari Hindi', serif",
                  fontSize: "clamp(2.2rem, 2vw, 1.5rem)",
                  color: "#fff",
                  letterSpacing: "4px",
                  minWidth: "2ch",
                  textAlign: "center",
                }}
              >
                {mins}
              </span>

              <span
                className="colon-blink"
                style={{ color: "#D4AF37", fontSize: "1.8rem", lineHeight: 1 }}
              >
                :
              </span>

              {/* सेकेन्ड */}
              <span
                style={{
                  fontFamily: "'Tiro Devanagari Hindi', serif",
                  fontSize: "clamp(2.2rem, 2vw, 1.5rem)",
                  color: "#D4AF37",
                  letterSpacing: "4px",
                  minWidth: "4ch",
                  textAlign: "center",
                }}
              >
                {secs}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url("${Mountain}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {[
          { number: "१७५",      label: "निर्वाचन क्षेत्र" },
          { number: "१८१६८२३०", label: "कुल मतदाता" },
          { number: "१२०+",     label: "दल सहभागी" },
          { number: "१००%",     label: "सुरक्षित एन्क्रिप्टेड" },
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