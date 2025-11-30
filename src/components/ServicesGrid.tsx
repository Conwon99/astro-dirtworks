import { trackServiceClick } from "@/utils/analytics";

type ServiceCard = {
  title: string;
  description: string;
  features: string[];
  image: string;
  link: string;
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Garden Maintenance",
    description: "Reliable upkeep to keep your garden healthy and tidy all year round",
    features: ["Lawn care", "Hedge trimming", "Planting & tidy-ups", "Seasonal maintenance"],
    image: "/Services/Dirt Works Gardening.webp",
    link: "/garden-maintenance/",
  },
  {
    title: "Landscaping & Groundworks",
    description: "Complete site preparation and outdoor landscaping solutions",
    features: ["Site preparation", "Drainage systems", "Foundations", "Excavation"],
    image: "/Services/Dirt Works at Groundwork..webp",
    link: "/landscaping-groundworks/",
  },
  {
    title: "Patios, Fencing & Decking",
    description: "Quality hardscaping installations built to last",
    features: ["Patios", "Fencing", "Decking", "Repairs & installation"],
    image: "/Services/dirt landscaping fencing..webp",
    link: "/patios-fencing-decking/",
  },
  {
    title: "Pressure Washing",
    description: "Restore the look of your outdoor surfaces",
    features: ["Driveways & patios", "Paths & walls", "Stain removal", "Soft-wash options"],
    image: "/Services/Dirtworks pressure washing..webp",
    link: "/pressure-washing/",
  },
  {
    title: "Building Services",
    description: "General building, repairs and small extensions",
    features: ["Brickwork", "Repairs", "Small extensions", "General building"],
    image: "/Services/Dirtworks building..webp",
    link: "/building-services/",
  },
];

const ServicesGrid = () => {

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-background to-[hsl(var(--muted))]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <div className="flex items-center mb-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mr-6">
              OUR SERVICES
            </h2>
            <div className="flex-1 h-px bg-[hsl(var(--asphalt-grey))]"></div>
          </div>
          <p className="text-xl text-[hsl(var(--asphalt-grey))] max-w-3xl">
            Professional services across Ayrshire and Glasgow: garden maintenance, landscaping & groundworks, patios, fencing & decking, pressure washing, and building services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_CARDS.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden flex flex-col rounded-3xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:scale-[1.02] h-full"
            >
              {/* Image (ANGE style: aspect wrapper, object-cover, centered) */}
              <a href={service.link} className="aspect-[4/3] overflow-hidden block">
                <img
                  src={service.image}
                  alt={`${service.title} service image`}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
              </a>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="font-display text-2xl font-bold text-[hsl(var(--asphalt-grey))] mb-2">
                    <a href={service.link} className="hover:text-[hsl(var(--primary-blue))] transition-colors">
                      {service.title}
                    </a>
                  </h3>
                  <p className="text-[hsl(var(--asphalt-grey))] opacity-80 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[hsl(var(--asphalt-grey))]">
                        <div className="w-1.5 h-1.5 bg-[hsl(var(--primary-blue))] rounded-full mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <a 
                    href={service.link}
                    className="block w-full text-center px-4 py-2 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted))]/80 text-[hsl(var(--asphalt-grey))] font-semibold rounded-full transition-colors"
                    onClick={() => trackServiceClick(service.title, 'services_grid')}
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;


