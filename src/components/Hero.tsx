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
import { trackPhoneCall, trackQuoteRequest, trackFormInteraction } from "@/utils/analytics";

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

      // Parse response to check actual Formspree status
      const data = await response.json();
      
      // Check both HTTP status AND Formspree response body
      // Formspree returns { ok: true } or { success: true } on success
      // Or { error: "message" } on failure
      const isSuccess = response.ok && (data.ok === true || data.success === true || (!data.error && !data.errors));
      
      if (isSuccess) {
        // Only track if Formspree confirms successful submission
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
        // Formspree rejected the submission (spam, validation, etc.)
        const errorMessage = data.error || data.errors?.[0]?.message || 'Failed to send message';
        throw new Error(errorMessage);
      }
    } catch (error) {
      trackFormInteraction('quote_form', 'submit_error');
      toast({
        title: "Error sending request",
        description: error instanceof Error ? error.message : "Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

  const handleCallClick = () => {
    trackPhoneCall('hero_section');
    window.location.href = "tel:+447403725998";
  };

  const handleQuoteClick = () => {
    window.location.href = "/contact";
  };

  return (
    <section id="hero" className="relative bg-background min-h-screen flex items-center py-20 px-3 sm:px-6 pt-28 md:pt-32 overflow-hidden w-full">
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
      
      <div className="container mx-auto max-w-7xl relative z-10 px-3 sm:px-6">
        <div className="flex justify-start">
          <div className="max-w-4xl w-full">
          {/* Text Content */}
          <div className="text-left space-y-8">
            <div className="space-y-6">
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-lg break-words">
                <span className="relative inline-block text-white">
                  Professional
                  <img 
                    src="/undelrine svg1.svg" 
                    alt="" 
                    className="absolute top-1/2 left-0 w-full h-16 md:h-20 lg:h-24 object-contain -z-10 max-w-full"
                  />
                </span> Landscaping & Building Services
              </h1>
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-white drop-shadow-lg flex items-center gap-3 flex-wrap">
                <MapPin className="w-6 h-6 flex-shrink-0" />
                <span className="break-words">Ayrshire & Glasgow</span>
              </h2>
              
              <p className="text-lg text-white/90 font-medium max-w-lg leading-relaxed drop-shadow-md break-words">
                Expert landscaping and building specialists serving Ayrshire and Glasgow. Professional garden maintenance, landscaping & groundworks, patios, fencing & decking, pressure washing, and building services. Trusted contractors delivering premium outdoor solutions
              </p>
            </div>



            {/* Quick Contact */}
            <div className="pt-4 border-t border-white/20">
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
              <Button 
                onClick={handleQuoteClick}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-6 sm:py-8 bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white rounded-lg font-semibold shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 text-base sm:text-lg relative overflow-hidden border border-white/20 w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></span>
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 flex-shrink-0" />
                <span className="relative z-10 whitespace-nowrap">GET A FREE QUOTE</span>
              </Button>
              <Button 
                onClick={handleCallClick}
                className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-10 py-6 sm:py-8 bg-transparent hover:bg-transparent text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-xs sm:text-sm text-gray-300 font-medium whitespace-nowrap">CALL US NOW</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-all">07403 725998</span>
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