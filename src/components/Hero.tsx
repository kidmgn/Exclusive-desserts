import { useEffect, useRef } from 'react';
import { ChevronDown, Star } from 'lucide-react';

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.pexels.com/photos/34073612/pexels-photo-34073612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200"
          alt="Elegant pastry display"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-rose-950/40 via-transparent to-rose-950/20" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-10 w-64 h-64 rounded-full border border-white/10 animate-spin-slow" />
      <div className="absolute top-1/3 right-16 w-40 h-40 rounded-full border border-rose-300/20 animate-spin-slow-reverse" />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 rounded-full border border-white/10 animate-spin-slow" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Pre-title tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
          <Star size={12} className="fill-rose-400 text-rose-400" />
          <span className="text-white/90 text-xs font-['Inter'] font-medium tracking-widest uppercase">
            Artisan Patisserie Since 2012
          </span>
          <Star size={12} className="fill-rose-400 text-rose-400" />
        </div>

        {/* Main heading */}
        <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-6 animate-slide-up">
          Where Every Bite
          <span className="block italic text-rose-300 mt-1">
            Tells a Story
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-['Inter'] text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed animate-slide-up animation-delay-200">
          Handcrafted desserts made with passion, precision, and the world's finest ingredients — delivered to your door.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-400">
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-['Inter'] font-semibold text-base transition-all duration-300 shadow-lg shadow-rose-900/40 hover:shadow-rose-700/50 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10">Explore Our Menu</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-['Inter'] font-semibold text-base hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            Our Story
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-16 animate-slide-up animation-delay-600">
          {[
            { value: '200+', label: 'Recipes' },
            { value: '50k+', label: 'Customers' },
            { value: '18', label: 'Awards' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="font-['Inter'] text-xs text-white/60 uppercase tracking-widest mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer group"
        aria-label="Scroll down"
      >
        <span className="font-['Inter'] text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown
          size={20}
          className="animate-bounce group-hover:text-rose-400 transition-colors"
        />
      </button>
    </section>
  );
}
