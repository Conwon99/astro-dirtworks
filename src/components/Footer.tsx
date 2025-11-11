import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { trackExternalLink } from "@/utils/analytics";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 px-4">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Dirtworks Landscaping
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white" />
                  <a 
                    href="tel:+447403725998" 
                    className="text-white hover:text-gray-300 transition-colors font-semibold"
                    onClick={() => trackExternalLink('phone', 'footer')}
                  >
                    (07403) 725998
                  </a>
                </div>
                <div className="text-white/80 text-sm">
                  Available Day & Night
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl font-bold text-white mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <a href="/garden-maintenance" className="hover:text-white transition-colors">
                  • Garden Maintenance
                </a>
              </li>
              <li>
                <a href="/landscaping-groundworks" className="hover:text-white transition-colors">
                  • Landscaping & Groundworks
                </a>
              </li>
              <li>
                <a href="/patios-fencing-decking" className="hover:text-white transition-colors">
                  • Patios, Fencing & Decking
                </a>
              </li>
              <li>
                <a href="/pressure-washing" className="hover:text-white transition-colors">
                  • Pressure Washing
                </a>
              </li>
              <li>
                <a href="/building-services" className="hover:text-white transition-colors">
                  • Building Services
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  • All Services →
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display text-xl font-bold text-white mb-6">
              Service Areas
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <a href="/locations" className="hover:text-white transition-colors">
                  • All Locations →
                </a>
              </li>
              <li>
                <a href="/glasgow" className="hover:text-white transition-colors">
                  • Glasgow
                </a>
              </li>
              <li>
                <a href="/ayrshire" className="hover:text-white transition-colors">
                  • Ayrshire
                </a>
              </li>
              <li>
                <a href="/locations/ayr" className="hover:text-white transition-colors">
                  • Ayr
                </a>
              </li>
              <li>
                <a href="/locations/kilmarnock" className="hover:text-white transition-colors">
                  • Kilmarnock
                </a>
              </li>
              <li>
                <a href="/locations/glasgow-city-center" className="hover:text-white transition-colors">
                  • Glasgow City Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-xl font-bold text-white mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <a href="/#about" className="hover:text-white transition-colors">
                  • About Us
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">
                  • Contact Us
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  • FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Resources Section */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-display text-lg font-bold text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <a href="/#faq" className="hover:text-white transition-colors">
                    Common Questions
                  </a>
                </li>
                <li>
                  <a href="/#services" className="hover:text-white transition-colors">
                    Service Information
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white text-sm">
              © {currentYear} Dirtworks Landscaping Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => trackExternalLink('facebook', 'footer')}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => trackExternalLink('instagram', 'footer')}
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => trackExternalLink('linkedin', 'footer')}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="text-white/70 text-sm text-center">
              Website Design by <a href="https://codapixel.com/" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:text-gray-300 transition-colors">Codapixel</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;