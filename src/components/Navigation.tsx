import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import LazyImage from "@/components/LazyImage";
import { trackPhoneCall, trackNavigation, trackQuoteRequest } from "@/utils/analytics";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  
  useEffect(() => {
    setIsHomePage(window.location.pathname === '/');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Approximate hero section height
      
      if (scrollY > heroHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    trackPhoneCall('navigation');
    window.location.href = "tel:+447403725998";
  };

  const scrollToSection = (sectionId: string) => {
    trackNavigation(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleQuoteClick = () => {
    trackQuoteRequest('navigation_button', []);
    if (isHomePage) {
      scrollToSection("contact-form");
    } else {
      // Navigate to homepage and scroll to contact form
      window.location.href = "/#contact-form";
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      // Navigate to homepage and scroll to section
      window.location.href = `/#${sectionId}`;
    }
  };

  const navItems = [
    { label: "Home", onClick: () => handleNavClick("hero"), isLink: false },
    { label: "Services", onClick: () => { window.location.href = "/services"; }, isLink: true },
    { label: "Locations", onClick: () => { window.location.href = "/locations"; }, isLink: true },
    { label: "Gallery", onClick: () => handleNavClick("gallery"), isLink: false },
    { label: "FAQ", onClick: () => handleNavClick("faq"), isLink: false },
    { label: "Contact", onClick: () => handleNavClick("contact-form"), isLink: false },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 overflow-hidden ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-16 h-16 md:w-20 md:h-20">
              <LazyImage
                src="/Dirtworks Landscaping logo edited..webp"
                alt="Dirtworks Landscaping Ltd logo"
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleCallClick}
              variant="ghost"
              className="flex items-center gap-4 text-primary-foreground/80 hover:text-primary-foreground bg-transparent hover:bg-transparent p-0"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <Phone className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-300 font-medium">CALL US NOW</span>
                <span className="text-lg font-bold text-white">07403 725998</span>
              </div>
            </Button>
            <Button
              onClick={handleQuoteClick}
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-6 py-2 rounded-full font-semibold"
            >
              Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-primary-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary border-t border-primary-foreground/20">
            <div className="py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="block w-full text-left px-4 py-2 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-4 border-t border-primary-foreground/20 space-y-3">
                <Button
                  onClick={handleCallClick}
                  variant="ghost"
                  className="w-full justify-start flex items-center gap-4 text-primary-foreground hover:text-primary-foreground/80 bg-transparent hover:bg-transparent p-0"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-300 font-medium">CALL US NOW</span>
                    <span className="text-lg font-bold text-white">07403 725998</span>
                  </div>
                </Button>
                <Button
                  onClick={handleQuoteClick}
                  className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary"
                >
                  Get Free Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;