import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Home, Facebook, Truck } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { trackWhatsAppClick } from "@/utils/analytics";

const AboutUs = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--asphalt-grey))] overflow-x-hidden">
      <div className="container mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 order-1">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white leading-tight">
                ABOUT US
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-primary"></div>
              
              <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-full lg:max-w-2xl break-words">
                We are trusted landscaping and building specialists serving Ayrshire and Glasgow. Our professional team specializes in garden maintenance, landscaping & groundworks, patios, fencing & decking, pressure washing, and building services. Expert installation services across Ayrshire and Glasgow, delivering premium outdoor solutions that enhance your property's beauty and value.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61573221204538" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors flex-shrink-0"
                >
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </a>
                <a 
                  href="https://wa.me/447403725998" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('whatsapp_click_about')}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors flex-shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" color="black" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Logo/Image */}
          <div className="flex justify-center order-2">
            <div className="text-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="mb-4 sm:mb-6 mx-auto">
                <LazyImage
                  src="/Dirtworks Landscaping logo edited..webp"
                  alt="Dirtworks Landscaping Ltd logo"
                  className="w-full h-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[320px] object-contain brightness-0 invert mx-auto"
                />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-1 sm:mb-2">
                DIRTWORKS
              </h3>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                LANDSCAPING LTD
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;