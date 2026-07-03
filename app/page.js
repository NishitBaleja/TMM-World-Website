import Navbar from "@/components/global/Navbar";
import Hero from "@/components/home-page/Hero";
import Philosophy from "@/components/home-page/Philosophy";
import Projects from "@/components/home-page/Projects";
import Company from "@/components/home-page/Company";
import Footer from "@/components/global/Footer";
import MainBackground from "@/components/global/MainBackground";
import CustomLoader from "@/components/global/CustomLoader";

export default function Home() {
  return (
    <>
      <CustomLoader />
      <MainBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="w-full bg-transparent">
          <Hero />
          <div className="h-60 md:h-[40vh]" />
          <Philosophy />
          <div className="h-60 md:h-[40vh]" />
          <Projects />
          <div className="h-28 md:h-[25vh]" />
          <Company />
        </main>
        <Footer />
      </div>
    </>
  );
}
