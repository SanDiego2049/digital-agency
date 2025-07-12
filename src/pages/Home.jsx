import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import backgroundImage from "../assets/image 3.png";
import CaseStudies from "../components/CaseStudies";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Team from "../components/Team";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#001515",
          opacity: 0.85,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <CaseStudies />
        <Services />
        <WhyUs />
        <Team />
        <ContactUs />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
