import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import icon2 from "../assets/Vector.png";

const Footer = () => {
  // Footer data structure
  const footerData = {
    "Our Services": [
      { text: "Digital Marketing", href: "#" },
      { text: "Building Projects", href: "#" },
      { text: "Learn More", href: "#" },
    ],
    "Navigation Links": [
      { text: "About Us", href: "#" },
      { text: "Contact Support", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
      { text: "FAQs", href: "#" },
    ],
    "Contact Us": [
      { text: "+234 813 441 9302", href: "tel:+2349134419302" },
      { text: "Request Demo", href: "#" },
      { text: "Feedback Form", href: "#" },
      { text: "Help Center", href: "#" },
      { text: "Join Our Community", href: "#" },
    ],
    Company: [
      { text: "Latest Updates", href: "#" },
      { text: "Upcoming Events", href: "#" },
      { text: "Partnership Opportunities", href: "#" },
      { text: "Lagos, Nigeria.", href: null }, // No link for location
      { text: "Get Started", href: "#" },
    ],
  };

  const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Linkedin, href: "#" },
  ];

  const bottomLinks = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
    { text: "Cookie Settings", href: "#" },
  ];

  const FooterSection = ({ title, items }) => (
    <div>
      <h3 className="text-lg text-[#BBDD86] font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.text}
              </a>
            ) : (
              <span className="text-gray-300">{item.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-[#002424] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Dynamic Footer Sections */}
          {Object.entries(footerData).map(([title, items]) => (
            <FooterSection key={title} title={title} items={items} />
          ))}

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg text-[#BBDD86] font-semibold mb-4">
              Subscribe for our updates
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Join our newsletter to stay informed about our latest features and
              updates.
            </p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your Email Here"
                className="flex-1 px-4 py-2 bg-[#002424] border border-[#BBDD86] rounded-s text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
              />
              <button className="px-6 py-2 bg-[#BBDD86] text-gray-900 rounded-e font-medium hover:bg-lime-300 transition-colors">
                Send
              </button>
            </div>
            <p className="text-gray-400 text-xs">
              By subscribing, you agree to our{" "}
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>{" "}
              and receive updates.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and Social Icons */}
            <div className="flex items-center gap-6">
              <img src={icon2} alt="Kudos" className="h-6" />
              <div className="flex gap-4">
                {socialIcons.map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom Links and Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <div className="flex gap-4">
                {bottomLinks.map(({ text, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="hover:text-white transition-colors"
                  >
                    {text}
                  </a>
                ))}
              </div>
              <p>
                © {new Date().getFullYear()} Kudos Digital. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
