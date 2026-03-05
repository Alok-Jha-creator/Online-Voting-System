import HeroSection    from "../pages/HeroSection";
import Footer         from "../pages/Footer";
import PratinidhiSabha from "../pages/PratinidhiSabha";
import PradeshSabha    from "../pages/PradeshSabha";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <PratinidhiSabha />
      <PradeshSabha />
      <Footer />
    </div>
  );
}