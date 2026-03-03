import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onFinish }) {
  const greetings = useMemo(
    () => ["Hello", "प्रणाम", "Namaskar", "नमस्ते 🙏"],
    []
  );

  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      // ✅ Fix 1: setIndex thyo setInterval hunu parchha thiyo
      const id = setInterval(() => setIndex((i) => i + 1), 1000);
      return () => clearInterval(id);
    } else {
      const t = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          // ✅ Fix 2: exit ma transition={} thyo — transition={{}} hunu parchha
          exit={{
            y: "-100%",
            transition: {
              
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <motion.h1
            key={index}
            // ✅ Fix 3: lg:8xl thyo — lg:text-8xl hunu parchha
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}