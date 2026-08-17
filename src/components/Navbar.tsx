import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { navLinks } from '../data';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { toggleCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-rose-50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex flex-col leading-none cursor-pointer"
            >
              <span
                className={`font-['Dancing_Script'] text-2xl font-bold tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-rose-800' : 'text-white'
                }`}
              >
                Unique
              </span>
              <span
                className={`font-['Playfair_Display'] text-xs uppercase tracking-[0.3em] transition-colors duration-300 ${
                  scrolled ? 'text-rose-400' : 'text-rose-200'
                }`}
              >
                Desserts
              </span>
            </button>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`font-['Inter'] text-sm font-medium tracking-wide transition-all duration-300 relative group cursor-pointer ${
                      scrolled ? 'text-stone-700 hover:text-rose-700' : 'text-white/90 hover:text-white'
                    } ${activeSection === link.href.slice(1) ? (scrolled ? 'text-rose-700' : 'text-white') : ''}`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-rose-500 transition-all duration-300 ${
                        activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleCart}
                className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  scrolled
                    ? 'text-stone-700 hover:bg-rose-50 hover:text-rose-700'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Open cart"
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-once">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('#contact')}
                className={`hidden md:block px-5 py-2.5 rounded-full text-sm font-semibold font-['Inter'] transition-all duration-300 cursor-pointer ${
                  scrolled
                    ? 'bg-rose-700 text-white hover:bg-rose-800 shadow-sm'
                    : 'bg-white/15 backdrop-blur-sm text-white border border-white/30 hover:bg-white/25'
                }`}
              >
                Order Now
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className={`md:hidden p-2 rounded-lg transition-colors duration-300 cursor-pointer ${
                  scrolled ? 'text-stone-700 hover:bg-rose-50' : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-rose-50">
            <span className="font-['Dancing_Script'] text-2xl font-bold text-rose-800">Unique Desserts</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-stone-500 hover:text-rose-700 cursor-pointer">
              <X size={20} />
            </button>
          </div>
          <ul className="flex flex-col py-6 px-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-['Inter'] text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeSection === link.href.slice(1)
                      ? 'bg-rose-50 text-rose-700'
                      : 'text-stone-700 hover:bg-rose-50 hover:text-rose-700'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-auto p-6 border-t border-rose-50">
            <button
              onClick={() => handleNavClick('#contact')}
              className="w-full py-3 bg-rose-700 text-white rounded-full font-semibold font-['Inter'] hover:bg-rose-800 transition-colors cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
