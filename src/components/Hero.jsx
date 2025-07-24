import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import BLOT from "../assets/BLOT BEAUTY.png";
import JETRIDE from "../assets/JETRIDE SVG.png";
import ALPHA_SEVEN_SOLUTIONS from "../assets/ALPHA 7.png";
import ABIDOL_PHARMA from "../assets/ABIDOL.png";
import ULÉ_HOMES from "../assets/ULE HOMES.png";

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef(null);
  const brandsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero elements on mount
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          descriptionRef.current,
          statsRef.current,
          brandsRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      const tl = gsap.timeline();

      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          brandsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );

      // Animate stats numbers
      gsap.fromTo(
        ".stat-number",
        {
          innerText: 0,
        },
        {
          innerText: (i, target) => target.dataset.value,
          duration: 2,
          delay: 1.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          stagger: 0.2,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "170", label: "Successful Projects", suffix: "+" },
    { number: "10", label: "Clients", suffix: "+" },
    { number: "4.8", label: "Average Client Rating", suffix: "" },
  ];

  const brands = [
    { name: "ULÉ HOMES", logo: ULÉ_HOMES },
    { name: "ABIDOL PHARMA", logo: ABIDOL_PHARMA },
    { name: "ALPHA SEVEN", logo: ALPHA_SEVEN_SOLUTIONS },
    { name: "JETRIDE", logo: JETRIDE },
    { name: "BLOT", logo: BLOT },
  ];

  return (
    <section ref={heroRef} className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-10 lg:py-24">
        {/* Top Banner */}
        <div ref={subtitleRef} className="flex justify-center mb-12">
          <div className="bg-slate-700/20 backdrop-blur-2xl rounded-full px-6 py-3 border border-gray-500/50">
            <div className="flex items-center space-x-3 text-gray-300 group">
              <span className="text-xs sm:text-sm">
                Kudos Digitals delivers user-centric solutions that convert.
              </span>
              <span className="bg-[#AAD468] p-2 rounded-full group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight size={16} className="text-[#FEFEFE]" />
              </span>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div ref={titleRef} className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center text-white leading-tight tracking-tight mb-6">
            <span className="text-[#AAD468] block sm:inline">Design</span>
            <span className="text-gray-300 block sm:inline">.</span>
            <span className="ml-0 sm:ml-4 text-[#AAD468] block sm:inline">
              Develop
            </span>
            <span className="text-gray-300 block sm:inline">.</span>
            <span className="ml-0 sm:ml-4 text-[#AAD468] block sm:inline">
              Deploy
            </span>
            <span className="text-gray-300 block sm:inline">.</span>
          </h1>
        </div>

        {/* Description */}
        <div ref={descriptionRef} className="text-center mb-16">
          <p className="text-gray-300 text-md md:text-xl max-w-4xl mx-auto leading-relaxed">
            We empower businesses with end-to-end digital transformation. From
            innovative UI/UX and robust development to flawless deployment.
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mb-20">
          <div className="bg-slate-800/20 backdrop-blur-2xl rounded-2xl border border-gray-500/50 p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <span className="stat-number" data-value={stat.number}>
                      0
                    </span>
                    <span className="text-lime-400">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-10 mx-auto">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-28 h-10 sm:w-32 sm:h-20"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} Logo`}
                className="max-h-12 object-contain mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
