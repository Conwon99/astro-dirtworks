import { Shield, MapPin, Star, Phone } from "lucide-react";

const TrustBar = () => {
  const trustItems = [
    {
      icon: MapPin,
      text: "Ayrshire & Glasgow"
    },
    {
      icon: Shield,
      text: "Fully Insured"
    },
    {
      icon: Phone,
      text: "Free Quotes"
    },
    {
      icon: Star,
      text: "5★ Reviews"
    }
  ];

  return (
    <section className="py-8 bg-green-600">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-white">
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-semibold text-sm md:text-base whitespace-normal">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;