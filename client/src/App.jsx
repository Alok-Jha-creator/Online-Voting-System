import { useState } from "react";
import IntroPage from "./components/IntroPage";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div>
      {showIntro ? (
        <IntroPage onEnter={() => setShowIntro(false)} />
      ) : (
        <div className="text-white text-center mt-20 text-2xl">
          🗳️ यहाँ तपाईंको Main Page आउँछ
        </div>
      )}
    </div>
  );
}
