import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import LazyImage from "@/components/LazyImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { trackPhoneCall, trackNavigation } from "@/utils/analytics";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  
  useEffect(() => {
    setIsHomePage(window.location.pathname === '/');
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
    // Removed trackQuoteRequest - only track on successful form submissions, not button clicks
    window.location.href = "/contact";
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
    { label: "HOME", onClick: () => handleNavClick("hero"), isLink: false },
    { label: "SERVICES", onClick: () => { window.location.href = "/services"; }, isLink: true },
    { label: "LOCATIONS", onClick: () => { window.location.href = "/locations"; }, isLink: true },
    { label: "GALLERY", onClick: () => handleNavClick("gallery"), isLink: false },
    { label: "FAQ", onClick: () => handleNavClick("faq"), isLink: false },
    { label: "CONTACT", onClick: () => { window.location.href = "/contact"; }, isLink: true },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 overflow-hidden bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-20 h-20 md:w-24 md:h-24">
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
                <span className="text-2xl font-bold text-white">07403 725998</span>
              </div>
            </Button>
            <Button
              onClick={handleQuoteClick}
              className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden border border-white/20 inline-flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></span>
              <WhatsAppIcon className="w-5 h-5 relative z-10" />
              <span className="relative z-10">GET A FREE QUOTE</span>
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
                    <span className="text-2xl font-bold text-white">07403 725998</span>
                  </div>
                </Button>
                <Button
                  onClick={handleQuoteClick}
                  className="w-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white rounded-lg font-semibold shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden border border-white/20 inline-flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></span>
                  <WhatsAppIcon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">GET A FREE QUOTE</span>
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