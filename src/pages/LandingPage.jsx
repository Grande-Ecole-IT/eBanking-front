import Background from "../layout/Background";
import CTA from "../layout/CTA";
import Features from "../layout/Features";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Hero from "../layout/Hero";
import Stats from "../layout/Stats";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900 overflow-hidden">
      <Background />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 md:py-10">
        <Header />
        <Hero />
        <Features />
        <Stats />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
