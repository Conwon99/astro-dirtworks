import React from 'react';
import { MapPin, Star, Clock, Shield, Award, Phone, MessageCircle } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { trackPhoneCall, trackWhatsAppClick } from '@/utils/analytics';

const Edinburgh = () => {
  const localLandmarks = [
    "Edinburgh Castle",
    "Royal Mile",
    "Holyrood Palace",
    "Arthur's Seat",
    "Princes Street Gardens",
    "Calton Hill",
    "Royal Botanic Garden",
    "Portobello Beach"
  ];

  const neighborhoods = [
    "New Town",
    "Old Town", 
    "Leith",
    "Stockbridge",
    "Morningside",
    "Marchmont",
    "Bruntsfield",
    "Portobello",
    "Colinton",
    "Corstorphine"
  ];

  const localTestimonials = [
    {
      name: "James MacLeod",
      location: "New Town, Edinburgh",
      rating: 5,
      text: "Clyde Decking created a stunning composite decking area in our New Town garden. The team worked around the historic building restrictions perfectly and the result exceeded our expectations!",
      service: "Composite Decking",
      landmark: "Near Edinburgh Castle"
    },
    {
      name: "Sarah Campbell",
      location: "Morningside, Edinburgh", 
      rating: 5,
      text: "Living near Arthur's Seat, we needed fencing that could handle Edinburgh's weather. The team delivered excellent work and the fencing looks fantastic year-round!",
      service: "Fencing Installation",
      landmark: "Near Arthur's Seat"
    },
    {
      name: "David Robertson",
      location: "Leith, Edinburgh",
      rating: 5,
      text: "Our Leith property needed decking that could handle the sea air. The composite decking they installed has been perfect - no maintenance and looks great despite the salt air!",
      service: "Composite Decking", 
      landmark: "Near Portobello Beach"
    }
  ];

  const localPainPoints = [
    "Edinburgh's historic building restrictions limiting outdoor modifications",
    "Salt air from the Firth of Forth affecting outdoor structures",
    "Steep hills and slopes requiring specialized decking solutions",
    "Limited space in New Town gardens requiring smart design",
    "Council planning requirements for World Heritage sites",
    "Edinburgh's variable weather requiring weather-resistant materials",
    "High foot traffic areas requiring durable fencing solutions"
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h1 className="font-display font-bold text-5xl lg:text-6xl text-foreground mb-6">
                <span className="text-primary">Decking & Fencing</span><br />
                Services in Edinburgh
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Serving Edinburgh's most prestigious areas including New Town, Old Town, Leith, and all surrounding neighborhoods. 
                Expert decking and fencing solutions tailored to Edinburgh's unique heritage and climate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+447495295903"
                  onClick={() => trackPhoneCall('edinburgh_hero')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 07495 295903
                </a>
                <a
                  href="https://wa.me/447495295903"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('whatsapp_click_edinburgh_hero')}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Local Areas Served */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl text-foreground mb-4">
                Edinburgh Areas We Serve
              </h2>
              <p className="text-xl text-muted-foreground">
                From the historic Old Town to the elegant New Town, we cover all of Edinburgh
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {neighborhoods.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                    {area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Landmarks & Context */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl text-foreground mb-4">
                Proudly Serving Edinburgh's Iconic Areas
              </h2>
              <p className="text-xl text-muted-foreground">
                We understand Edinburgh's unique heritage and work with World Heritage site regulations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                  Local Landmarks We Work Near
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {localLandmarks.map((landmark, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border"
                    >
                      <Award className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{landmark}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-4">
                  Common Edinburgh Challenges We Solve
                </h3>
                <ul className="space-y-3">
                  {localPainPoints.map((painPoint, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{painPoint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Local Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl text-foreground mb-4">
                What Edinburgh Customers Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Real reviews from real Edinburgh customers
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {localTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-accent fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="border-t border-border pt-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    <div className="text-sm text-primary">{testimonial.landmark}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.service}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us for Edinburgh */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-4xl text-foreground mb-4">
                Why Edinburgh Chooses Clyde Decking
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Heritage Expertise
                </h3>
                <p className="text-muted-foreground">
                  We understand Edinburgh's World Heritage status and work within strict regulations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Salt Air Protection
                </h3>
                <p className="text-muted-foreground">
                  Materials chosen to withstand the Firth of Forth's salt air and coastal conditions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Historic Area Experience
                </h3>
                <p className="text-muted-foreground">
                  We know Edinburgh's neighborhoods and work around local restrictions and slopes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-display font-bold text-4xl mb-4">
              Ready to Transform Your Edinburgh Garden?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your free quote today and join hundreds of satisfied Edinburgh customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+447495295903"
                onClick={() => trackPhoneCall('edinburgh_cta')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 07495 295903
              </a>
              <a
                href="https://wa.me/447495295903"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('whatsapp_click_edinburgh_cta')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Edinburgh;
