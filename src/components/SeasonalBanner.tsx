import { Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { desserts } from '../data';
import toast from 'react-hot-toast';

export default function SeasonalBanner() {
  const { ref, inView } = useScrollAnimation();
  const { addItem } = useCart();
  const featured = desserts.find((d) => d.isBestseller) ?? desserts[0];

  return (
    <section className="py-20 bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-rose-700/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-pink-800/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Sparkles size={14} className="text-amber-300" />
              <span className="font-['Inter'] text-white/90 text-xs font-medium tracking-widest uppercase">
                Seasonal Special
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Summer's Finest
              <em className="block text-rose-300 italic mt-1">Flavour Collection</em>
            </h2>
            <p className="font-['Inter'] text-rose-100/70 text-base leading-relaxed mb-8 max-w-md">
              Every season brings new inspiration. Our summer collection celebrates sun-ripened berries,
              floral infusions, and the delicate sweetness of peak-season produce.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  addItem(featured);
                  toast.success(`${featured.name} added to cart!`, {
                    icon: '🌸',
                    style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px' },
                  });
                }}
                className="px-7 py-3.5 bg-white text-rose-800 rounded-full font-['Inter'] font-bold text-sm hover:bg-rose-50 transition-all duration-300 shadow-lg cursor-pointer hover:-translate-y-0.5"
              >
                Try {featured.name}
              </button>
              <button
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 bg-transparent border-2 border-white/40 text-white rounded-full font-['Inter'] font-semibold text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                View Full Collection
              </button>
            </div>
          </div>

          {/* Image cards stack */}
          <div className="relative h-72 lg:h-80">
            <div className="absolute top-0 right-8 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/34569681/pexels-photo-34569681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=400"
                alt="Summer pastry"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-6 right-36 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=400"
                alt="Seasonal cakes"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Price badge */}
            <div className="absolute bottom-4 left-0 bg-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="font-['Inter'] text-xs text-stone-500 uppercase tracking-wider">Starting from</div>
              <div className="font-['Playfair_Display'] text-2xl font-bold text-rose-700">£3.20</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
