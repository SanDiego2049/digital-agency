import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamMember1 from "../assets/teamMember1.png";
import teamMember2 from "../assets/teamMember2.png";
import teamMember3 from "../assets/teamMember3.jpg";
import teamMember4 from "../assets/teamMember4.png";

gsap.registerPlugin(ScrollTrigger);

const TeamMemberCard = ({ member, cardRef }) => (
  <div
    ref={cardRef}
    className="flex-shrink-0 snap-center w-[85vw] sm:w-80 group"
  >
    <div className="relative overflow-hidden rounded-3xl w-full h-96 transition-all duration-500 hover:shadow-2xl">
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className="text-sm opacity-90 mb-2">{member.role}</p>
        <p className="text-xs opacity-75">{member.description}</p>
      </div>
      <div className="absolute top-4 left-4 bg-[#0A1A1A] text-[#AAD468] px-3 py-1 rounded-full text-xs font-medium">
        {member.category}
      </div>
    </div>
  </div>
);

const CarouselNavigation = ({
  scrollLeft,
  scrollRight,
  currentIndex,
  total,
  perView,
}) => (
  <div className="hidden md:flex items-center space-x-4">
    <button
      onClick={scrollLeft}
      disabled={currentIndex === 0}
      className="w-8 h-8 bg-[#AAD468] rounded-full flex items-center justify-center text-[#0A1A1A] hover:bg-[#9BC859] disabled:opacity-50 disabled:bg-transparent disabled:border-2 disabled:border-[#AAD468] disabled:cursor-not-allowed disabled:text-[#AAD468]"
    >
      <ChevronLeft size={20} />
    </button>
    <button
      onClick={scrollRight}
      disabled={currentIndex >= total - perView}
      className="w-8 h-8 bg-[#AAD468] rounded-full flex items-center justify-center text-[#0A1A1A] hover:bg-[#9BC859] disabled:opacity-50 disabled:bg-transparent disabled:border-2 disabled:border-[#AAD468] disabled:cursor-not-allowed disabled:text-[#AAD468]"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

const MobileNavigation = ({
  scrollLeft,
  scrollRight,
  currentIndex,
  total,
  scrollToIndex,
}) => (
  <div className="md:hidden flex justify-center items-center space-x-4 mt-8">
    <button
      onClick={scrollLeft}
      disabled={currentIndex === 0}
      className="w-10 h-10 bg-[#AAD468] rounded-full text-[#0A1A1A] flex items-center justify-center hover:bg-[#9BC859] disabled:opacity-50"
    >
      <ChevronLeft size={20} />
    </button>
    <div className="flex space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          onClick={() => scrollToIndex(index)}
          className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
            index === currentIndex ? "bg-[#AAD468]" : "bg-white/30"
          }`}
        />
      ))}
    </div>
    <button
      onClick={scrollRight}
      disabled={currentIndex >= total - 1}
      className="w-10 h-10 bg-[#AAD468] rounded-full text-[#0A1A1A] flex items-center justify-center hover:bg-[#9BC859] disabled:opacity-50"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

const CategoryFilter = ({ categories, active, onChange }) => (
  <div className="w-full mb-8">
    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === cat
              ? "bg-[#AAD468] text-[#0A1A1A]"
              : "bg-transparent text-[#AAD468] border border-[#AAD468] hover:bg-[#AAD468] hover:text-[#0A1A1A]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);

const Team = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const [activeCategory, setActiveCategory] = useState("All");

  const teamMembers = [
    {
      id: 1,
      name: "Courage OGBONNA",
      role: "Creative Director",
      category: "All",
      image: teamMember1,
      description: "Leading creative vision and strategic design direction.",
    },
    {
      id: 2,
      name: "Emmanuel ONI",
      role: "Product Designer Intern",
      category: "Graphic Designers",
      image: teamMember2,
      description:
        "Crafting intuitive user experiences and innovative designs.",
    },
    {
      id: 3,
      name: "Silver DAVIDSON",
      role: "Product Designer Intern",
      category: "Graphic Designers",
      image: teamMember3,
      description: "UI design and visual storytelling expert.",
    },
    {
      id: 4,
      name: "Esther ADEBAYO",
      role: "Product Manager",
      category: "Data Analysts",
      image: teamMember4,
      description: "Drives product strategy with cross-functional teams.",
    },
  ];

  const categories = [
    "All",
    "Web Developers",
    "Graphic Designers",
    "Social Media Managers",
    "Data Analysts",
  ];

  const filtered = teamMembers.filter(
    (member) => activeCategory === "All" || member.category === activeCategory
  );

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    scrollContainerRef.current?.scrollTo({
      left: index * scrollContainerRef.current.offsetWidth * 0.85,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(filtered.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const itemWidth = scrollContainerRef.current.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / itemWidth);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
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
  }, []);

  useEffect(() => {
    cardRefs.current = [];
    scrollToIndex(0);
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-extrabold text-[#AAD468] mb-6 md:mb-0"
          >
            Our Team
          </h2>
          <CarouselNavigation
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
            currentIndex={currentIndex}
            total={filtered.length}
            perView={itemsPerView}
          />
        </div>

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
          >
            {filtered.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                cardRef={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>

        <MobileNavigation
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
          currentIndex={currentIndex}
          total={filtered.length}
          scrollToIndex={scrollToIndex}
        />
      </div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Team;
