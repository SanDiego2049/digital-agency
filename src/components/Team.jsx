import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamMember1 from "../assets/teamMember1.png";
import teamMember2 from "../assets/teamMember2.png";
import teamMember3 from "../assets/teamMember3.jpg";
import teamMember4 from "../assets/teamMember4.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Reusable Navigation Component
const CarouselNavigation = ({
  onScrollLeft,
  onScrollRight,
  currentIndex,
  totalItems,
  itemsPerView = 3,
  className = "",
}) => {
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= totalItems - itemsPerView;

  return (
    <div className={`hidden md:flex items-center space-x-4 ${className}`}>
      <button
        onClick={onScrollLeft}
        disabled={isAtStart}
        className="flex items-center justify-center w-8 h-8 bg-[#AAD468] rounded-full disabled:text-[#AAD468] text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:bg-transparent disabled:border-2 disabled:border-[#AAD468] disabled:cursor-not-allowed group"
      >
        <ChevronLeft
          size={24}
          className="group-hover:scale-110 transition-transform"
        />
      </button>
      <button
        onClick={onScrollRight}
        disabled={isAtEnd}
        className="flex items-center justify-center w-8 h-8 bg-[#AAD468] rounded-full disabled:text-[#AAD468] text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:bg-transparent disabled:border-2 disabled:border-[#AAD468] disabled:cursor-not-allowed group"
      >
        <ChevronRight
          size={24}
          className="group-hover:scale-110 transition-transform"
        />
      </button>
    </div>
  );
};

// Reusable Mobile Navigation Component
const MobileCarouselNavigation = ({
  onScrollLeft,
  onScrollRight,
  currentIndex,
  totalItems,
  onDotClick,
  className = "",
}) => {
  return (
    <div
      className={`md:hidden flex justify-center items-center space-x-4 mt-8 ${className}`}
    >
      <button
        onClick={onScrollLeft}
        disabled={currentIndex === 0}
        className="flex items-center justify-center w-10 h-10 bg-[#AAD468] rounded-full text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Dots indicator */}
      <div className="flex space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
              index === currentIndex ? "bg-[#AAD468]" : "bg-white/30"
            }`}
            onClick={() => onDotClick(index)}
          />
        ))}
      </div>

      <button
        onClick={onScrollRight}
        disabled={currentIndex >= totalItems - 1}
        className="flex items-center justify-center w-10 h-10 bg-[#AAD468] rounded-full text-[#0A1A1A] hover:bg-[#9BC859] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// Reusable Carousel Hook
const useCarousel = (itemsCount, itemWidth = 400, itemsPerView = 3) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      scrollContainerRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const maxIndex = Math.max(0, itemsCount - itemsPerView);
      const newIndex = Math.min(maxIndex, currentIndex + 1);
      setCurrentIndex(newIndex);
      scrollContainerRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth",
      });
    }
  };

  return {
    currentIndex,
    scrollContainerRef,
    scrollLeft,
    scrollRight,
    handleScroll,
    scrollToIndex,
  };
};

// Team Member Card Component
const TeamMemberCard = ({ member, index, cardRef }) => {
  return (
    <div ref={cardRef} className="group flex-shrink-0 snap-center">
      <div className="relative overflow-hidden rounded-3xl w-80 h-96 transform transition-all duration-500 hover:shadow-2xl">
        {/* Member Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Member Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="text-xl font-bold mb-1 leading-tight">
            {member.name}
          </h3>
          <p className="text-sm opacity-90 mb-2">{member.role}</p>
          <p className="text-xs opacity-75 leading-relaxed">
            {member.description}
          </p>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-[#0A1A1A] text-[#AAD468] px-3 py-1 rounded-full text-xs font-medium">
          {member.category}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
      </div>
    </div>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? "bg-[#AAD468] text-[#0A1A1A]"
              : "bg-transparent text-[#AAD468] border border-[#AAD468] hover:bg-[#AAD468] hover:text-[#0A1A1A]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Main Team Component
const Team = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Courage OGBONNA",
      role: "Creative Director",
      category: "All",
      image: teamMember1,
      description:
        "Leading creative vision and strategic design direction for all projects.",
    },
    {
      id: 2,
      name: "Emmanuel ONI",
      role: "Product Designer Intern",
      category: "Graphic Designers",
      image: teamMember2,
      description:
        "Crafting intuitive user experiences and innovative design solutions.",
    },
    {
      id: 3,
      name: "Silver DAVIDSON",
      role: "Product Designer Intern",
      category: "Graphic Designers",
      image: teamMember3,
      description:
        "Specializing in user interface design and visual communication.",
    },
    {
      id: 4,
      name: "Esther ADEBAYO",
      role: "Product Manager",
      category: "Data Analysts",
      image: teamMember4,
      description:
        "Driving product strategy and coordinating cross-functional teams.",
    },
    // Add more team members as needed
  ];

  const categories = [
    "All",
    "Web Developers",
    "Graphic Designers",
    "Social Media Managers",
    "Data Analysts",
  ];

  // Filter team members based on active category
  const filteredMembers = teamMembers.filter(
    (member) => activeCategory === "All" || member.category === activeCategory
  );

  const {
    currentIndex,
    scrollContainerRef,
    scrollLeft,
    scrollRight,
    handleScroll,
    scrollToIndex,
  } = useCarousel(filteredMembers.length, 320, 3);

  // GSAP Animations
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
  }, [filteredMembers]);

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-16">
          <div ref={titleRef} className="mb-8 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#AAD468] mb-4">
              Our Team
            </h2>
          </div>

          {/* Desktop Navigation */}
          <CarouselNavigation
            onScrollLeft={scrollLeft}
            onScrollRight={scrollRight}
            currentIndex={currentIndex}
            totalItems={filteredMembers.length}
            itemsPerView={3}
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Team Grid */}
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
            {filteredMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                cardRef={(el) => (cardsRef.current[index] = el)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileCarouselNavigation
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
          currentIndex={currentIndex}
          totalItems={filteredMembers.length}
          onDotClick={scrollToIndex}
        />
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

export default Team;
