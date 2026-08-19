import { useState } from 'react';
import { Sparkles, Pencil, X, Upload } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type SeasonalContent } from '../context/SiteContentContext';
import type { Dessert } from '../types';
import toast from 'react-hot-toast';

function SeasonalEditModal({ initial, desserts, onSave, onClose }: {
  initial: SeasonalContent;
  desserts: Dessert[];
  onSave: (content: SeasonalContent) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<SeasonalContent>({ ...initial });

  const handleChange = (field: keyof SeasonalContent, value: string | number | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: 'image1' | 'image2') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange(field, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.heading1.trim() || !form.description.trim() || !form.image1.trim() || !form.image2.trim()) {
      toast.error('Заполните основные поля');
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
          Редактирование сезонного баннера
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
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Описание</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Префикс главной кнопки</label>
              <input
                type="text"
                value={form.primaryBtnPrefix}
                onChange={(e) => handleChange('primaryBtnPrefix', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="Например: Попробовать"
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
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Цена (текст)</label>
              <input
                type="text"
                value={form.priceText}
                onChange={(e) => handleChange('priceText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Цена (значение)</label>
              <input
                type="text"
                value={form.priceValue}
                onChange={(e) => handleChange('priceValue', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Featured-десерт</label>
              <select
                value={form.featuredId ?? ''}
                onChange={(e) => handleChange('featuredId', e.target.value ? Number(e.target.value) : null)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              >
                <option value="">Автоматически (хит продаж)</option>
                {desserts.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Изображение 1</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={form.image1}
                  onChange={(e) => handleChange('image1', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="https://... или загрузите"
                />
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer text-sm font-['Inter']">
                  <Upload size={14} />
                  Загрузить
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload('image1')}
                    className="hidden"
                  />
                </label>
              </div>
              {form.image1 && <img src={form.image1} alt="Предпросмотр" className="mt-2 w-32 h-32 object-cover rounded-xl border" />}
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Изображение 2</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={form.image2}
                  onChange={(e) => handleChange('image2', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="https://... или загрузите"
                />
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer text-sm font-['Inter']">
                  <Upload size={14} />
                  Загрузить
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload('image2')}
                    className="hidden"
                  />
                </label>
              </div>
              {form.image2 && <img src={form.image2} alt="Предпросмотр" className="mt-2 w-32 h-32 object-cover rounded-xl border" />}
            </div>
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

export default function SeasonalBanner() {
  const { ref, inView } = useScrollAnimation();
  const { addItem } = useCart();
  const { isAdmin } = useAuth();
  const { desserts, seasonalContent, updateSeasonalContent } = useSiteContent();
  const [editOpen, setEditOpen] = useState(false);

  const featured =
    (seasonalContent.featuredId && desserts.find((d) => d.id === seasonalContent.featuredId)) ||
    desserts.find((d) => d.isBestseller) ||
    desserts[0];

  const handleSave = (content: SeasonalContent) => {
    updateSeasonalContent(content);
    toast.success('Сезонный баннер обновлён');
    setEditOpen(false);
  };

  const handleAddFeatured = () => {
    if (featured) {
      addItem(featured);
      toast.success(`${featured.name} добавлен в корзину!`, {
        icon: '🌸',
        style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px' },
      });
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 overflow-hidden">
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
                {seasonalContent.preTitle}
              </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {seasonalContent.heading1}
              <em className="block text-rose-300 italic mt-1">{seasonalContent.heading2}</em>
            </h2>
            <p className="font-['Inter'] text-rose-100/70 text-base leading-relaxed mb-8 max-w-md">
              {seasonalContent.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {featured && (
                <button
                  onClick={handleAddFeatured}
                  className="px-7 py-3.5 bg-white text-rose-800 rounded-full font-['Inter'] font-bold text-sm hover:bg-rose-50 transition-all duration-300 shadow-lg cursor-pointer hover:-translate-y-0.5"
                >
                  {seasonalContent.primaryBtnPrefix} {featured.name}
                </button>
              )}
              <button
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3.5 bg-transparent border-2 border-white/40 text-white rounded-full font-['Inter'] font-semibold text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {seasonalContent.secondaryBtnText}
              </button>
            </div>
          </div>

          {/* Image cards stack */}
          <div className="relative h-72 lg:h-80">
            <div className="absolute top-0 right-8 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={seasonalContent.image1}
                alt="Летний десерт"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-6 right-36 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl -rotate-6 hover:rotate-0 transition-transform duration-500">
              <img
                src={seasonalContent.image2}
                alt="Сезонные торты"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Price badge */}
            <div className="absolute bottom-4 left-0 bg-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="font-['Inter'] text-xs text-stone-500 uppercase tracking-wider">{seasonalContent.priceText}</div>
              <div className="font-['Playfair_Display'] text-2xl font-bold text-rose-700">{seasonalContent.priceValue}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка редактирования для админа */}
      {isAdmin && (
        <button
          onClick={() => setEditOpen(true)}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
          aria-label="Редактировать сезонный баннер"
        >
          <Pencil size={16} />
          <span className="font-['Inter'] text-sm">Редактировать</span>
        </button>
      )}

      {editOpen && (
        <SeasonalEditModal
          initial={seasonalContent}
          desserts={desserts}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </section>
  );
}
