import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { stats } from '../data';
import { Award, Leaf, Heart, Clock } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Award-Winning Craft',
    desc: '18 international awards for excellence in patisserie, recognised by France\'s Institut Culinaire.',
  },
  {
    icon: Leaf,
    title: 'Finest Ingredients',
    desc: 'We source organic flour, single-origin chocolate, and fresh seasonal produce every morning.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    desc: 'Every dessert is handcrafted in small batches to ensure unrivalled quality and consistency.',
  },
  {
    icon: Clock,
    title: 'Same-Day Delivery',
    desc: 'Order before noon and receive your artisan desserts fresh at your door the same afternoon.',
  },
];

export default function About() {
  const { ref: textRef, inView: textInView } = useScrollAnimation();
  const { ref: imageRef, inView: imageInView } = useScrollAnimation();
  const { ref: statsRef, inView: statsInView } = useScrollAnimation();

  return (
    <section id="about" className="py-28 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Top grid: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">

          {/* Text side */}
          <div
            ref={textRef}
            className={`transition-all duration-700 ${
              textInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="inline-block font-['Dancing_Script'] text-rose-500 text-2xl mb-3">
              Our Story
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-6">
              Passion Baked Into
              <em className="block text-rose-700 not-italic"> Every Creation</em>
            </h2>
            <p className="font-['Inter'] text-stone-600 leading-relaxed mb-5 text-base">
              Founded in 2012 by head pastry chef <strong className="text-stone-800">Isabelle Moreau</strong>, Unique Desserts
              was born from a simple belief: that truly extraordinary sweets should be accessible to everyone.
              What began as a small Parisian-inspired atelier has grown into an award-winning patisserie
              celebrated across the country.
            </p>
            <p className="font-['Inter'] text-stone-600 leading-relaxed mb-8 text-base">
              Each morning our team arrives before dawn to prepare fresh doughs, temper finest-grade chocolate
              and pipe exquisitely delicate creams. We never rush, and we never compromise.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 p-4 rounded-2xl bg-white border border-rose-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
                    <Icon size={18} className="text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-['Inter'] font-semibold text-stone-800 text-sm mb-1">{title}</h3>
                    <p className="font-['Inter'] text-stone-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-700 delay-200 ${
              imageInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-rose-200/40">
              <img
                src="https://images.pexels.com/photos/19499006/pexels-photo-19499006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700"
                alt="Artisan cakes close-up"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-rose-50">
              <div className="font-['Dancing_Script'] text-3xl font-bold text-rose-700 leading-none">12+</div>
              <div className="font-['Inter'] text-xs text-stone-500 uppercase tracking-widest mt-1">Years of Craft</div>
            </div>

            {/* Floating award badge */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-rose-700 flex flex-col items-center justify-center shadow-lg shadow-rose-300/40">
              <Award size={18} className="text-white mb-0.5" />
              <span className="font-['Playfair_Display'] text-white text-[10px] font-bold text-center leading-tight">18 Awards</span>
            </div>

            {/* Secondary image */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white hidden sm:block">
              <img
                src="https://images.pexels.com/photos/12927171/pexels-photo-12927171.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=200"
                alt="Blue velvet desserts"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 ${
            statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-3xl bg-white border border-rose-50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-['Playfair_Display'] text-4xl font-bold text-rose-700 mb-2">
                {stat.value}
              </div>
              <div className="font-['Inter'] text-xs text-stone-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
