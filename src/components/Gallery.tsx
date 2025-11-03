import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Facebook } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import { trackGalleryInteraction, trackExternalLink } from "@/utils/analytics";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    { src: "/gallery/gallery1.webp", alt: "Project photo 1" },
    { src: "/gallery/Gallery 2..webp", alt: "Project photo 2" },
    { src: "/gallery/Gallery 3..webp", alt: "Project photo 3" },
    { src: "/gallery/Gallery 4..webp", alt: "Project photo 4" },
    { src: "/gallery/Gallery 5..webp", alt: "Project photo 5" },
    { src: "/gallery/Gallery 6..webp", alt: "Project photo 6" }
  ];

  const openLightbox = (index: number) => {
    trackGalleryInteraction('image_open', index);
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    trackGalleryInteraction('lightbox_close');
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      trackGalleryInteraction('image_next', selectedImage);
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      trackGalleryInteraction('image_prev', selectedImage);
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleFacebookClick = () => {
    trackExternalLink('https://www.facebook.com/profile.php?id=61573221204538', 'View more work on Facebook');
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-background overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <div className="flex items-center mb-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-[hsl(var(--asphalt-grey))] mr-6">
              OUR WORK GALLERY
            </h2>
            <div className="flex-1 h-px bg-[hsl(var(--asphalt-grey))]"></div>
          </div>
          <p className="text-xl text-[hsl(var(--asphalt-grey))] max-w-3xl">
            Take a look at some of our recent groundworks and landscaping projects across Glasgow and Ayrshire
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://www.facebook.com/profile.php?id=61573221204538"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFacebookClick}
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Facebook className="w-6 h-6" />
            View more work on Facebook
          </a>
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="max-w-4xl max-h-full">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;