import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import image1 from "../assets/AUGUST WK 4 - Artboard 4 2.jpg";
import image2 from "../assets/GALLIVANTER RELAUNCH - Artboard 2 1.png";
import image3 from "../assets/ACCRA (1) 1.png";
import image4 from "../assets/TGIF WK1 1@2x.jpg";

const CaseStudies = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const handleWheel = (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY;
        }
      };

      const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft;
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        setScrollProgress(progress);
      };

      scrollContainer.addEventListener("wheel", handleWheel);
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const caseStudies = [
    {
      id: 1,
      title: "Talent Visa Platform",
      description:
        "How the Talent Visa program revolutionized tech recruitment",
      image: image1,
      bgColor: "bg-red-500",
    },
    {
      id: 2,
      title: "Group Trips Platform",
      description: "Group Trips are Awesome! - Travel booking made simple",
      image: image2,
      bgColor: "bg-gray-800",
    },
    {
      id: 3,
      title: "Ghana Tourism Package",
      description: "Premium African Tourism Package - NT.586,800",
      image: image3,
      bgColor: "bg-yellow-600",
    },
    {
      id: 4,
      title: "Weekend Campaign",
      description: "The Weekend is Upon Us - Marketing campaign design",
      image: image4,
      bgColor: "bg-red-600",
    },
  ];

  return (
    <section ref={sectionRef} className="px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div ref={titleRef}>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#AAD468] mb-4">
              Case Studies
            </h2>
          </div>
          <button className="hidden md:flex items-center space-x-2 bg-transparent border border-[#AAD468] rounded-full px-6 py-3 text-[#AAD468] hover:bg-[#AAD468] hover:text-slate-900 transition-all duration-300 group">
            <span className="text-sm font-medium">View Case study</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Horizontal Scrollable Case Studies */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-4 px-8 -mx-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group flex-shrink-0 transform transition-all duration-300"
            >
              <img
                className="sm:w-80 sm:h-96 w-60 h-76 object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                src={study.image}
                alt={study.title}
              />
            </div>
          ))}
        </div>

        {/* Scroll Progress Bar */}
        <div className="mt-8 px-8">
          <div className="relative">
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#AAD468] rounded-full transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>Scroll to explore</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
          </div>
        </div>

        {/* Mobile View Case Study Button */}
        <div className="md:hidden mt-12 text-center">
          <button className="inline-flex items-center space-x-2 bg-transparent border border-[#AAD468] rounded-full px-6 py-3 text-[#AAD468] hover:bg-[#AAD468] hover:text-slate-900 transition-all duration-300 group">
            <span className="text-sm font-medium">View Case study</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
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
      `}</style>
    </section>
  );
};

export default CaseStudies;
