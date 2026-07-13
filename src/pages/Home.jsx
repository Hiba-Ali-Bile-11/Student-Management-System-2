import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";



function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06B6D4] via-cyan-500 to-[#1E3A8A]">
      <Header/>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <Footer />
    </div>
  );
}

export default Home;