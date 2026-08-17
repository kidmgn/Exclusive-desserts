import { useState } from 'react';
import { ShoppingBag, Star, Plus } from 'lucide-react';
import { desserts, categories } from '../data';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { type DessertCategory } from '../types';
import toast from 'react-hot-toast';

function DessertCard({ dessert, index }: { dessert: typeof desserts[0]; index: number }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(dessert);
    toast.success(`${dessert.name} added to cart!`, {
      icon: '🍰',
      style: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        borderRadius: '12px',
        background: '#fff',
        color: '#292524',
        border: '1px solid #fce7f3',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
      },
    });
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-stone-100"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={dessert.image}
          alt={dessert.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {dessert.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-[11px] font-['Inter'] font-semibold rounded-full uppercase tracking-wide ${
              dessert.badge === 'New'
                ? 'bg-emerald-500 text-white'
                : dessert.badge === 'Bestseller'
                ? 'bg-amber-400 text-amber-900'
                : 'bg-rose-600 text-white'
            }`}
          >
            {dessert.badge}
          </span>
        )}

        {/* Quick add button */}
        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer"
          aria-label={`Add ${dessert.name} to cart`}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(dessert.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200 fill-stone-200'}
            />
          ))}
          <span className="font-['Inter'] text-xs text-stone-400 ml-1">{dessert.rating}</span>
        </div>

        {/* Category pill */}
        <span className="text-[10px] font-['Inter'] font-medium text-rose-500 uppercase tracking-widest">
          {dessert.category}
        </span>

        <h3 className="font-['Playfair_Display'] text-lg font-semibold text-stone-900 mt-1 mb-1.5 group-hover:text-rose-700 transition-colors duration-300">
          {dessert.name}
        </h3>
        <p className="font-['Inter'] text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {dessert.description}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-['Playfair_Display'] text-2xl font-bold text-stone-900">
              £{dessert.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white rounded-full font-['Inter'] text-sm font-semibold transition-all duration-300 cursor-pointer group/btn"
          >
            <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<DessertCategory>('all');
  const { ref, inView } = useScrollAnimation();

  const filtered = activeCategory === 'all'
    ? desserts
    : desserts.filter((d) => d.category === activeCategory);

  return (
    <section id="menu" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block font-['Dancing_Script'] text-rose-500 text-2xl mb-3">
            Our Menu
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Crafted with Devotion
          </h2>
          <p className="font-['Inter'] text-stone-500 max-w-lg mx-auto leading-relaxed">
            Browse our seasonal collection — each piece a labour of love, made fresh daily in our atelier.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as DessertCategory)}
              className={`px-5 py-2.5 rounded-full font-['Inter'] text-sm font-medium transition-all duration-300 cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-rose-700 text-white border-rose-700 shadow-md shadow-rose-200'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-rose-300 hover:text-rose-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((dessert, i) => (
            <DessertCard key={dessert.id} dessert={dessert} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="font-['Inter'] text-stone-500 mb-4 text-sm">
            Looking for something bespoke? We create custom orders for weddings, birthdays and events.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-white rounded-full font-['Inter'] font-semibold text-sm transition-all duration-300 cursor-pointer"
          >
            Enquire About Custom Orders
          </button>
        </div>
      </div>
    </section>
  );
}
