import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Star, Pencil, X, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type HeroContent } from '../context/SiteContentContext';
import toast from 'react-hot-toast';

function HeroEditModal({ initial, onSave, onClose }: {
  initial: HeroContent;
  onSave: (content: HeroContent) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<HeroContent>({ ...initial, stats: initial.stats.map((s) => ({ ...s })) });

  const handleChange = (field: keyof Omit<HeroContent, 'stats'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
    setForm((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange('bgImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.heading1.trim() || !form.subtitle.trim() || !form.bgImage.trim()) {
      toast.error('Заполните основные поля (заголовок, подзаголовок, изображение)');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900 mb-5">
          Редактирование Hero
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Предзаголовок</label>
              <input
                type="text"
                value={form.preTitle}
                onChange={(e) => handleChange('preTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Заголовок (строка 1)</label>
              <input
                type="text"
                value={form.heading1}
                onChange={(e) => handleChange('heading1', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Заголовок (строка 2)</label>
              <input
                type="text"
                value={form.heading2}
                onChange={(e) => handleChange('heading2', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Подзаголовок</label>
              <textarea
                value={form.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Текст основной кнопки</label>
              <input
                type="text"
                value={form.primaryBtnText}
                onChange={(e) => handleChange('primaryBtnText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Текст второстепенной кнопки</label>
              <input
                type="text"
                value={form.secondaryBtnText}
                onChange={(e) => handleChange('secondaryBtnText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Фоновое изображение</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={form.bgImage}
                onChange={(e) => handleChange('bgImage', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="https://... или загрузите файл"
              />
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer text-sm font-['Inter']">
                <Upload size={14} />
                Загрузить
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {form.bgImage && (
              <img src={form.bgImage} alt="Предпросмотр" className="mt-2 w-48 h-24 object-cover rounded-xl border border-stone-200" />
            )}
          </div>

          <div>
            <h3 className="font-['Inter'] text-sm font-semibold text-stone-700 mb-2">Статистика</h3>
            {form.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 mb-2">
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Значение"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Подпись"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-stone-300 text-stone-700 rounded-full font-['Inter'] text-sm font-semibold hover:bg-stone-100 cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-full font-['Inter'] text-sm font-semibold cursor-pointer shadow-sm"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAuth();
  const { heroContent, updateHeroContent } = useSiteContent();
  const [editOpen, setEditOpen] = useState(false);

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

  const handleSave = (content: HeroContent) => {
    updateHeroContent(content);
    toast.success('Hero обновлён');
    setEditOpen(false);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-24 md:pt-28 lg:pt-32 pb-32 md:pb-36"
    >
      {/* Background image with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src={heroContent.bgImage}
          alt="Элегантная витрина с десертами"
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
        {/* Pre-title tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in">
          <Star size={12} className="fill-rose-400 text-rose-400" />
          <span className="text-white/90 text-xs font-['Inter'] font-medium tracking-widest uppercase">
            {heroContent.preTitle}
          </span>
          <Star size={12} className="fill-rose-400 text-rose-400" />
        </div>

        {/* Main heading */}
        <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-4 animate-slide-up">
          {heroContent.heading1}
          <span className="block italic text-rose-300 mt-1">
            {heroContent.heading2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-['Inter'] text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-6 font-light leading-relaxed animate-slide-up animation-delay-200">
          {heroContent.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-400">
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-['Inter'] font-semibold text-base transition-all duration-300 shadow-lg shadow-rose-900/40 hover:shadow-rose-700/50 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10">{heroContent.primaryBtnText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-['Inter'] font-semibold text-base hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            {heroContent.secondaryBtnText}
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 mt-10 animate-slide-up animation-delay-600">
          {heroContent.stats.map((stat, i) => (
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
        aria-label="Прокрутить вниз"
      >
        <span className="font-['Inter'] text-xs uppercase tracking-widest">Листайте</span>
        <ChevronDown
          size={20}
          className="animate-bounce group-hover:text-rose-400 transition-colors"
        />
      </button>

      {/* Admin edit button */}
      {isAdmin && (
        <button
          onClick={() => setEditOpen(true)}
          className="absolute top-24 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
          aria-label="Редактировать Hero"
        >
          <Pencil size={16} />
          <span className="font-['Inter'] text-sm">Редактировать</span>
        </button>
      )}

      {/* Edit modal */}
      {editOpen && (
        <HeroEditModal
          initial={heroContent}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </section>
  );
}
