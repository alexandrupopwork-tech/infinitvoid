import { StarFieldProvider } from "@/components/StarFieldProvider";
import StarField from "@/components/StarField";
import SiteExperience from "@/components/SiteExperience";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ProductShowcase from "@/components/ProductShowcase";
import FirstDrop from "@/components/FirstDrop";
import FirstWave from "@/components/FirstWave";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <StarFieldProvider>
      <StarField />
      <SiteExperience>
        <Nav />
        <main>
          <Hero />
          <Philosophy />
          <ProductShowcase />
          <FirstDrop />
          <FirstWave />
        </main>
        <Footer />
      </SiteExperience>
    </StarFieldProvider>
  );
}
