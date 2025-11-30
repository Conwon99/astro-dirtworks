import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const SimpleContactSection = () => {
  const handleQuoteClick = () => {
    window.location.href = "/contact";
  };

  return (
    <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[hsl(var(--asphalt-grey))] mb-6">
          Contact Us
        </h2>
        <p className="text-lg sm:text-xl text-[hsl(var(--asphalt-grey))] mb-10 max-w-2xl mx-auto">
          Ready to transform your outdoor space? Get in touch for your free quote today!
        </p>
        <Button
          onClick={handleQuoteClick}
          className="inline-flex items-center justify-center gap-3 px-12 py-10 bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white rounded-lg font-semibold shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 text-xl md:text-2xl relative overflow-hidden border border-white/20"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></span>
          <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 relative z-10" />
          <span className="relative z-10">GET A FREE QUOTE</span>
        </Button>
      </div>
    </section>
  );
};

export default SimpleContactSection;


