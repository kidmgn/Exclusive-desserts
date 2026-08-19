import { useState } from 'react';
import { Award, Leaf, Heart, Clock, Pencil, X, Upload } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type AboutContent, type AboutValue } from '../context/SiteContentContext';
import toast from 'react-hot-toast';

function AboutEditModal({ initial, onSave, onClose }: {
  initial: AboutContent;
  onSave: (content: AboutContent) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<AboutContent>({
    ...initial,
    values: initial.values.map((v) => ({ ...v })),
    stats: initial.stats.map((s) => ({ ...s })),
  });

  const handleChange = (field: keyof Omit<AboutContent, 'values' | 'stats'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleValueChange = (index: number, field: keyof AboutValue, value: string) => {
    setForm((prev) => {
      const newValues = [...prev.values];
      newValues[index] = { ...newValues[index], [field]: value };
      return { ...prev, values: newValues };
    });
  };

  const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
    setForm((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleImageUpload = (field: 'mainImage' | 'secondaryImage') => (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!form.heading1.trim() || !form.paragraph1.trim() || !form.mainImage.trim()) {
      toast.error('Заполните основные поля (заголовок, описание, основное изображение)');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900 mb-5">
          Редактирование раздела «О нас»
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
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Первый абзац</label>
              <textarea
                value={form.paragraph1}
                onChange={(e) => handleChange('paragraph1', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                rows={4}
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Второй абзац</label>
              <textarea
                value={form.paragraph2}
                onChange={(e) => handleChange('paragraph2', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                rows={4}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Основное изображение</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={form.mainImage}
                  onChange={(e) => handleChange('mainImage', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="https://... или загрузите"
                />
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer text-sm font-['Inter']">
                  <Upload size={14} />
                  Загрузить
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload('mainImage')}
                    className="hidden"
                  />
                </label>
              </div>
              {form.mainImage && <img src={form.mainImage} alt="Предпросмотр" className="mt-2 w-32 h-32 object-cover rounded-xl border" />}
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Вторичное изображение</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={form.secondaryImage}
                  onChange={(e) => handleChange('secondaryImage', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="https://... или загрузите"
                />
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer text-sm font-['Inter']">
                  <Upload size={14} />
                  Загрузить
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload('secondaryImage')}
                    className="hidden"
                  />
                </label>
              </div>
              {form.secondaryImage && <img src={form.secondaryImage} alt="Предпросмотр" className="mt-2 w-24 h-24 object-cover rounded-xl border" />}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Текст бейджа (12+)</label>
              <input
                type="text"
                value={form.badgeText}
                onChange={(e) => handleChange('badgeText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Подпись бейджа</label>
              <input
                type="text"
                value={form.badgeSubtext}
                onChange={(e) => handleChange('badgeSubtext', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Число наград</label>
              <input
                type="text"
                value={form.awardNumber}
                onChange={(e) => handleChange('awardNumber', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Подпись наград</label>
              <input
                type="text"
                value={form.awardLabel}
                onChange={(e) => handleChange('awardLabel', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
          </div>

          <div>
            <h3 className="font-['Inter'] text-sm font-semibold text-stone-700 mb-2">Ценности (4 блока)</h3>
            {form.values.map((value, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={value.title}
                  onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Заголовок"
                />
                <textarea
                  value={value.desc}
                  onChange={(e) => handleValueChange(index, 'desc', e.target.value)}
                  className="px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                  rows={2}
                  placeholder="Описание"
                />
              </div>
            ))}
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

export default function About() {
  const { ref: textRef, inView: textInView } = useScrollAnimation();
  const { ref: imageRef, inView: imageInView } = useScrollAnimation();
  const { ref: statsRef, inView: statsInView } = useScrollAnimation();
  const { isAdmin } = useAuth();
  const { aboutContent, updateAboutContent } = useSiteContent();
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = (content: AboutContent) => {
    updateAboutContent(content);
    toast.success('Раздел «О нас» обновлён');
    setEditOpen(false);
  };

  const iconMap = {
    award: Award,
    leaf: Leaf,
    heart: Heart,
    clock: Clock,
  };

  return (
    <section id="about" className="relative py-28 bg-stone-50 overflow-hidden">
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
              {aboutContent.preTitle}
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-900 leading-tight mb-6">
              {aboutContent.heading1}
              <em className="block text-rose-700 not-italic">{aboutContent.heading2}</em>
            </h2>
            <p className="font-['Inter'] text-stone-600 leading-relaxed mb-5 text-base">
              {aboutContent.paragraph1}
            </p>
            <p className="font-['Inter'] text-stone-600 leading-relaxed mb-8 text-base">
              {aboutContent.paragraph2}
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutContent.values.map((value, idx) => {
                const Icon = iconMap[value.icon] || Award;
                return (
                  <div
                    key={value.title + idx}
                    className="flex gap-3 p-4 rounded-2xl bg-white border border-rose-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
                      <Icon size={18} className="text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-['Inter'] font-semibold text-stone-800 text-sm mb-1">{value.title}</h3>
                      <p className="font-['Inter'] text-stone-500 text-xs leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image side */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-700 delay-200 ${
              imageInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-rose-200/40">
              <img
                src={aboutContent.mainImage}
                alt="Авторские торты крупным планом"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-rose-50">
              <div className="font-['Dancing_Script'] text-3xl font-bold text-rose-700 leading-none">
                {aboutContent.badgeText}
              </div>
              <div className="font-['Inter'] text-xs text-stone-500 uppercase tracking-widest mt-1">
                {aboutContent.badgeSubtext}
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-rose-700 flex flex-col items-center justify-center shadow-lg shadow-rose-300/40">
              <Award size={18} className="text-white mb-0.5" />
              <span className="font-['Playfair_Display'] text-white text-[10px] font-bold text-center leading-tight">
                {aboutContent.awardNumber} {aboutContent.awardLabel}
              </span>
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white hidden sm:block">
              <img
                src={aboutContent.secondaryImage}
                alt="Синие бархатные десерты"
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
          {aboutContent.stats.map((stat, i) => (
            <div
              key={stat.label + i}
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

      {/* Кнопка редактирования для админа */}
      {isAdmin && (
        <button
          onClick={() => setEditOpen(true)}
          className="absolute top-24 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm text-stone-700 border border-stone-200 rounded-full hover:bg-white transition-colors cursor-pointer shadow-sm"
          aria-label="Редактировать раздел О нас"
        >
          <Pencil size={16} />
          <span className="font-['Inter'] text-sm">Редактировать «О нас»</span>
        </button>
      )}

      {editOpen && (
        <AboutEditModal
          initial={aboutContent}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </section>
  );
}
