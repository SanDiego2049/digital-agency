import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/Group 625860.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const el = mobileMenuRef.current;
    if (el) {
      if (isMobileMenuOpen) {
        el.style.maxHeight = el.scrollHeight + "px";
        el.style.opacity = "1";
      } else {
        el.style.maxHeight = "0px";
        el.style.opacity = "0";
      }
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", href: "#", active: true },
    { name: "Our Work", href: "#", active: false },
    { name: "Our Brand", href: "#", active: false },
    { name: "Our Story", href: "#", active: false },
    { name: "Contact Us", href: "#", active: false },
  ];

  return (
    <nav className="px-4 py-6 lg:px-8 relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <img className="w-25" src={logo} alt="Kudos Digital Agency Logo" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          <div className="bg-slate-700/20 backdrop-blur-2xl border border-gray-500/50 rounded-full px-2 py-2 flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "text-[#AAD468]"
                    : "text-gray-300 hover:text-white hover:bg-slate-600/50"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* CTA + Toggle */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#AAD468] hidden lg:flex text-[#FEFEFE] px-6 py-2 rounded-full text-sm font-semibold hover:bg-lime-300 transition-colors duration-200">
            Join us Today
          </button>

          <button
            className="lg:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0"
      >
        <div className="bg-slate-700/20 backdrop-blur-2xl border border-gray-500/50 rounded-2xl p-4 mt-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`block px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "text-[#AAD468]"
                  : "text-gray-300 hover:text-white hover:bg-slate-600/50"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button className="w-full bg-[#AAD468] text-[#FEFEFE] px-6 py-2 rounded-full text-sm font-semibold hover:bg-lime-300 transition-colors duration-200">
            Join Us Today
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
