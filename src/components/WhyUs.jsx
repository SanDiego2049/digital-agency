import { useEffect, useRef } from "react";
import { Users, Target, RefreshCw, Award } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyUsBackgroundImage from "../assets/WhyUsBackgroundImage.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

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

  const whyUsData = [
    {
      id: 1,
      title: "Remote-First Agility",
      description:
        "Our diverse team collaborates seamlessly to deliver exceptional results, no matter where we are.",
      icon: <Users size={32} />,
      bgColor: "bg-slate-800",
      textColor: "text-white",
      iconBg: "bg-[#AAD468]",
      iconColor: "text-slate-800",
    },
    {
      id: 2,
      title: "User-Centric Approach",
      description:
        "We prioritize your audience, ensuring every solution we build is intuitive and effective.",
      icon: <Target size={32} />,
      bgColor: "bg-gray-100",
      textColor: "text-slate-800",
      iconBg: "bg-slate-800",
      iconColor: "text-white",
    },
    {
      id: 3,
      title: "End-to-End Solutions",
      description:
        "From concept to launch and beyond, we're your complete digital transformation partner.",
      icon: <RefreshCw size={32} />,
      bgColor: "bg-gray-100",
      textColor: "text-slate-800",
      iconBg: "bg-slate-800",
      iconColor: "text-white",
    },
    {
      id: 4,
      title: "Proven Track Record",
      description:
        "Our success is measured by the tangible results we deliver for our clients.",
      icon: <Award size={32} />,
      bgColor: "bg-slate-800",
      textColor: "text-white",
      iconBg: "bg-[#AAD468]",
      iconColor: "text-slate-800",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Cards Grid */}
        <div className="relative">
          {/* Layered background elements */}
          <div className="absolute inset-0 transform rotate-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl opacity-20"></div>
          <div className="absolute inset-0 transform -rotate-1 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl opacity-30"></div>

          {/* Main content area */}
          <div
            style={{
              backgroundImage: `url(${WhyUsBackgroundImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-12"
          >
            {/* Header */}
            <div ref={titleRef} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#001515] mb-4">
                Why{" "}
                <span className="bg-[#AAD468] text-[#F7FBF0] px-3 py-1 rounded-lg">
                  Choose Kudos
                </span>{" "}
                Digitals?
              </h2>
              <p className="text-[#001515] text-lg max-w-2xl mx-auto">
                Partner with us for innovation, expertise, and a commitment to
                your success.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {whyUsData.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`${item.bgColor} ${item.textColor} rounded-2xl p-6 md:p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
                >
                  {/* Icon */}
                  <div
                    className={`${item.iconBg} ${item.iconColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed opacity-90">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#AAD468]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="flex justify-center mt-12">
          <div className="w-20 h-1 bg-[#AAD468] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
