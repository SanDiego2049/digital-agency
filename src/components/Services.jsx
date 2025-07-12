import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Palette,
  Target,
  Zap,
  Calendar,
  Globe,
  PenTool,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 60,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              delay: index * 0.15,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 1,
      title: "UI/UX Design",
      description:
        "We specialize in designing user-centric digital experiences that are intuitive, efficient, and visually compelling. From wireframes to fully interactive prototypes, we ensure every interface enhances user satisfaction and aligns with your business objectives.",
      icon: <Palette size={24} />,
      gradient: "from-[#AAD468] to-[#9BC859]",
    },
    {
      id: 2,
      title: "Brand Identity Development",
      description:
        "We craft cohesive brand identities that resonate, including logo design, typography, color systems, tone of voice, and comprehensive brand guidelines to maintain consistency across all touchpoints.",
      icon: <Target size={24} />,
      gradient: "from-[#AAD468] to-[#9BC859]",
    },
    {
      id: 3,
      title: "MVP Design & Development",
      description:
        "We offer rapid design and development of MVPs that are functional, scalable, and investor-readyenabling early market entry, user feedback, and strategic iteration.",
      icon: <Zap size={24} />,
      gradient: "from-[#AAD468] to-[#9BC859]",
    },
    {
      id: 4,
      title: "Event Branding",
      description:
        "We develop distinctive branding systems for conferences, launches, and experiences covering event logos, signage, stage design assets, digital content, and more to ensure your brand is powerfully represented throughout the event lifecycle.",
      icon: <Calendar size={24} />,
      gradient: "from-[#AAD468] to-[#9BC859]",
    },
    {
      id: 5,
      title: "Website Design (No-Code - WordPress)",
      description:
        "We build high-performance websites using no-code tools like WordPress ensuring fast deployment, responsive design, and ease of content management. From landing pages to full corporate websites, we deliver visually engaging, user-friendly platforms aligned with your brand and goals.",
      icon: <Globe size={24} />,
      gradient: "from-[#AAD468] to-[#9BC859]",
    },
    {
      id: 6,
      title: "Graphic Design & Visual Communication",
      description:
        "Our graphic design services cover a broad spectrum, including custom illustrations, social media content design, marketing collateral, and print materials. We combine creativity with strategy to produce designs that communicate clearly and reinforce your brand’s presence across all media.",
      icon: <PenTool size={24} />,
      gradient: "from-[#AAD468] to-[#9BC859]",
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 400; // Approximate card width + gap
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 400; // Approximate card width + gap
      const maxIndex = Math.max(0, services.length - 3); // Show 3 cards at a time
      const newIndex = Math.min(maxIndex, currentIndex + 1);
      setCurrentIndex(newIndex);
      scrollContainerRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 400;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section ref={sectionRef} className="py-40 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div ref={titleRef}>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#AAD468] mb-4">
              Our Services
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className="flex items-center justify-center w-8 h-8 bg-[#AAD468] rounded-full disabled:text-[#AAD468] text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:bg-transparent disabled:border-2 disabled:border-[#AAD468] disabled:cursor-not-allowed group"
            >
              <ChevronLeft
                size={24}
                className=" group-hover:scale-110 transition-transform"
              />
            </button>
            <button
              onClick={scrollRight}
              disabled={currentIndex >= services.length - 3}
              className="flex items-center justify-center w-8 h-8 bg-[#AAD468] rounded-full disabled:text-[#AAD468] text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:bg-transparent disabled:border-2 disabled:border-[#AAD468] disabled:cursor-not-allowed group"
            >
              <ChevronRight
                size={24}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group flex-shrink-0 snap-center"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl w-90 h-72 bg-gradient-to-br ${service.gradient} transform transition-all duration-500  p-8`}
                >
                  {/* Icon */}
                  <div className="absolute top-6 right-6 bg-[#0A1A1A] rounded-full p-3 text-[#AAD468] group-hover:rotate-12 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="flex text-wrap flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-[#0A1A1A] mb-4 pr-8 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-[#0A1A1A] text-sm leading-relaxed opacity-90">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="flex items-center justify-center w-10 h-10 bg-[#AAD468] rounded-full text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots indicator */}
          <div className="flex space-x-2">
            {services.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                  index === currentIndex ? "bg-[#AAD468]" : "bg-white/30"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * 400,
                      behavior: "smooth",
                    });
                  }
                }}
              />
            ))}
          </div>

          <button
            onClick={scrollRight}
            disabled={currentIndex >= services.length - 1}
            className="flex items-center justify-center w-10 h-10 bg-[#AAD468] rounded-full text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
};

export default Services;
