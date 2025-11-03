import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { trackPhoneCall, trackWhatsAppClick, trackQuoteRequest, trackFormInteraction } from "@/utils/analytics";

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const { toast } = useToast();

  const serviceOptions = [
    'Groundworks',
    'Monoblocking', 
    'Artificial Grass',
    'Brickwork',
    'Fencing',
    'Decking',
    'General Landscaping',
    'Site Preparation'
  ];


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/mgvnlora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: 'Free Quote Request from Website'
        }),
      });

      if (response.ok) {
        // Track successful form submission
        trackQuoteRequest('contact_form', [formData.service]);
        trackFormInteraction('quote_form', 'submit_success');
        
        toast({
          title: "Quote request sent!",
          description: "Thank you for your request. We'll respond within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      trackFormInteraction('quote_form', 'submit_error');
      toast({
        title: "Error sending request",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleCallClick = () => {
    trackPhoneCall('hero_section');
    window.location.href = "tel:+447403725998";
  };

  const handleMessengerClick = () => {
    trackWhatsAppClick('whatsapp_click_hero');
    window.open("https://wa.me/447403725998", "_blank");
  };

  return (
    <section id="hero" className="relative bg-background min-h-screen flex items-center py-20 px-4 pt-32 overflow-hidden w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <LazyImage
          src="/dirt Landscaping Hero Background.webp"
          alt="Dirtworks Landscaping hero background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex justify-start">
          <div className="max-w-4xl">
          {/* Text Content */}
          <div className="text-left space-y-8">
            <div className="space-y-6">
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-lg">
                <span className="relative inline-block text-white">
                  Professional
                  <img 
                    src="/undelrine svg1.svg" 
                    alt="" 
                    className="absolute top-1/2 left-0 w-full h-16 md:h-20 lg:h-24 object-contain -z-10 max-w-full overflow-hidden"
                  />
                </span> Landscaping & Building Services
              </h1>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-white drop-shadow-lg flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                Ayrshire & Glasgow
              </h2>
              
              <p className="text-lg text-white/90 font-medium max-w-lg leading-relaxed drop-shadow-md">
                Expert landscaping and building specialists serving Ayrshire and Glasgow. Professional garden maintenance, landscaping & groundworks, patios, fencing & decking, pressure washing, and building services. Trusted contractors delivering premium outdoor solutions
              </p>
            </div>



            {/* Quick Contact */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-white text-lg font-semibold mb-3 text-center sm:text-left">Give us a call or a Whatsapp for a <span className="font-bold text-green-400">FREE QUOTE</span></p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
              <Button 
                onClick={handleMessengerClick}
                className="inline-flex items-center justify-center gap-3 px-10 py-8 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
              >
                <WhatsAppIcon className="w-8 h-8" />
                WhatsApp
              </Button>
              <Button 
                onClick={handleCallClick}
                className="inline-flex items-center gap-4 px-10 py-8 bg-transparent hover:bg-transparent text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <Phone className="w-7 h-7 text-blue-500" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-300 font-medium">CALL US NOW</span>
                  <span className="text-xl font-bold text-white">07403 725998</span>
                </div>
              </Button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;