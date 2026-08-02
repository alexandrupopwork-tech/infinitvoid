import SiteExperience from "@/components/SiteExperience";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SiteExperience>
      <Nav />
      <main>
        <Hero />
        <ProductShowcase />
        <About />
      </main>
      <Footer />
    </SiteExperience>
  );
}
