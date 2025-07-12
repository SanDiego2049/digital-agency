import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/Group 625860.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#", active: true },
    { name: "Our Work", href: "#", active: false },
    { name: "Our Brand", href: "#", active: false },
    { name: "Our Story", href: "#", active: false },
    { name: "Contact Us", href: "#", active: false },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="px-4 py-10 lg:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Kudos Digital Agency Logo" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
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
                aria-label={`Navigate to ${item.name}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-[#AAD468] text-[#FEFEFE] px-6 py-2 rounded-full text-sm font-semibold hover:bg-lime-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-label="Join us today"
          >
            Join us Today
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-slate-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-slate-600/50"
                }`}
                aria-label={`Navigate to ${item.name}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
