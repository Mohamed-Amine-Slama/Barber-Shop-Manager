import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { CoreTreatmentSection } from "@/components/CoreTreatmentSection";
import { Gallery } from "@/components/Gallery";
import { LocationSection } from "@/components/LocationSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <CoreTreatmentSection />
        <Gallery />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
