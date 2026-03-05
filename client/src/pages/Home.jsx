import HeroSection    from "../pages/HeroSection";
import AboutSection   from "../pages/AboutSection";
import Footer         from "../pages/Footer";
import PratinidhiSabha from "../pages/PratinidhiSabha";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <PratinidhiSabha />
      <AboutSection />
      <Footer />
    </div>
  );
}