import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');
  const { ref, inView } = useScrollAnimation();

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <section id="gallery" className="py-28 bg-stone-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <div
            ref={ref}
            className={`text-center mb-14 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block font-['Dancing_Script'] text-rose-400 text-2xl mb-3">
              Gallery
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-4">
              A Feast for the Eyes
            </h2>
            <p className="font-['Inter'] text-stone-400 max-w-lg mx-auto leading-relaxed">
              Before your first bite, let your eyes savour the artistry that goes into every creation.
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
            {galleryImages.map((img, i) => (
              <div
                key={img.id}
                onClick={() => openLightbox(img.src, img.alt)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span} ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                style={{
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  transitionDelay: `${i * 80}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-['Inter'] text-white text-xs">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="text-center mt-12">
            <p className="font-['Inter'] text-stone-500 text-sm mb-4">
              Follow our journey on Instagram for daily inspiration
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-['Inter'] font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @uniquedesserts
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          <img
            src={lightboxSrc}
            alt={lightboxAlt}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-['Inter'] text-white/60 text-sm">
            {lightboxAlt}
          </p>
        </div>
      )}
    </>
  );
}
