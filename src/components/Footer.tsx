import { useState } from 'react';
import { Heart, Pencil, X, Plus, Trash2, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type FooterContent, type SocialLink, type FooterLinkColumn } from '../context/SiteContentContext';
import toast from 'react-hot-toast';

function FooterEditModal({ initial, onSave, onClose }: {
  initial: FooterContent;
  onSave: (content: FooterContent) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FooterContent>({
    ...initial,
    socialLinks: initial.socialLinks.map((s) => ({ ...s })),
    linkColumns: initial.linkColumns.map((c) => ({ ...c, links: c.links.map((l) => ({ ...l })) })),
  });

  const handleChange = (field: keyof Omit<FooterContent, 'socialLinks' | 'linkColumns'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (index: number, field: keyof SocialLink, value: string) => {
    setForm((prev) => {
      const newSocials = [...prev.socialLinks];
      newSocials[index] = { ...newSocials[index], [field]: value };
      return { ...prev, socialLinks: newSocials };
    });
  };

  const addSocial = () => {
    setForm((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { label: 'Новая соцсеть', href: '#', svgPath: '' }],
    }));
  };

  const removeSocial = (index: number) => {
    setForm((prev) => {
      const newSocials = [...prev.socialLinks];
      newSocials.splice(index, 1);
      return { ...prev, socialLinks: newSocials };
    });
  };

  const handleColumnTitleChange = (index: number, value: string) => {
    setForm((prev) => {
      const newColumns = [...prev.linkColumns];
      newColumns[index] = { ...newColumns[index], title: value };
      return { ...prev, linkColumns: newColumns };
    });
  };

  const handleLinkChange = (colIndex: number, linkIndex: number, field: 'label' | 'href', value: string) => {
    setForm((prev) => {
      const newColumns = [...prev.linkColumns];
      const newLinks = [...newColumns[colIndex].links];
      newLinks[linkIndex] = { ...newLinks[linkIndex], [field]: value };
      newColumns[colIndex] = { ...newColumns[colIndex], links: newLinks };
      return { ...prev, linkColumns: newColumns };
    });
  };

  const addLink = (colIndex: number) => {
    setForm((prev) => {
      const newColumns = [...prev.linkColumns];
      newColumns[colIndex] = {
        ...newColumns[colIndex],
        links: [...newColumns[colIndex].links, { label: 'Новая ссылка', href: '#' }],
      };
      return { ...prev, linkColumns: newColumns };
    });
  };

  const removeLink = (colIndex: number, linkIndex: number) => {
    setForm((prev) => {
      const newColumns = [...prev.linkColumns];
      const newLinks = [...newColumns[colIndex].links];
      newLinks.splice(linkIndex, 1);
      newColumns[colIndex] = { ...newColumns[colIndex], links: newLinks };
      return { ...prev, linkColumns: newColumns };
    });
  };

  const addColumn = () => {
    setForm((prev) => ({
      ...prev,
      linkColumns: [...prev.linkColumns, { title: 'Новая колонка', links: [] }],
    }));
  };

  const removeColumn = (colIndex: number) => {
    setForm((prev) => {
      const newColumns = [...prev.linkColumns];
      newColumns.splice(colIndex, 1);
      return { ...prev, linkColumns: newColumns };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange('ctaBgImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.brandName.trim() || !form.description.trim()) {
      toast.error('Заполните название бренда и описание');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900 mb-5">
          Редактирование футера
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Основные тексты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Название бренда</label>
              <input
                type="text"
                value={form.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Подзаголовок бренда</label>
              <input
                type="text"
                value={form.brandSubName}
                onChange={(e) => handleChange('brandSubName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Описание</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* CTA баннер */}
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 space-y-4">
            <h3 className="font-['Inter'] text-sm font-semibold text-stone-700">CTA-баннер</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={form.ctaPreTitle}
                onChange={(e) => handleChange('ctaPreTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="Предзаголовок"
              />
              <input
                type="text"
                value={form.ctaHeading}
                onChange={(e) => handleChange('ctaHeading', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="Заголовок"
              />
              <textarea
                value={form.ctaDescription}
                onChange={(e) => handleChange('ctaDescription', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                rows={3}
                placeholder="Описание"
              />
              <div className="space-y-2">
                <input
                  type="text"
                  value={form.ctaPlaceholder}
                  onChange={(e) => handleChange('ctaPlaceholder', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Плейсхолдер email"
                />
                <input
                  type="text"
                  value={form.ctaButtonText}
                  onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Текст кнопки"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.ctaBgImage}
                    onChange={(e) => handleChange('ctaBgImage', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                    placeholder="URL фонового изображения"
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
                {form.ctaBgImage && (
                  <img src={form.ctaBgImage} alt="Предпросмотр" className="mt-2 w-48 h-24 object-cover rounded-xl border" />
                )}
              </div>
            </div>
          </div>

          {/* Социальные сети */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Inter'] text-sm font-semibold text-stone-700">Социальные сети</h3>
              <button
                type="button"
                onClick={addSocial}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-['Inter'] hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                Добавить
              </button>
            </div>
            <div className="space-y-3">
              {form.socialLinks.map((social, index) => (
                <div key={index} className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-['Inter'] text-sm font-semibold text-stone-700">Соцсеть {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeSocial(index)}
                      className="p-1.5 text-stone-400 hover:text-red-500 cursor-pointer"
                      aria-label="Удалить соцсеть"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={social.label}
                      onChange={(e) => handleSocialChange(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                      placeholder="Название"
                    />
                    <input
                      type="text"
                      value={social.href}
                      onChange={(e) => handleSocialChange(index, 'href', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                      placeholder="Ссылка"
                    />
                    <div className="md:col-span-2">
                      <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">SVG path</label>
                      <textarea
                        value={social.svgPath}
                        onChange={(e) => handleSocialChange(index, 'svgPath', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Колонки ссылок */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Inter'] text-sm font-semibold text-stone-700">Колонки ссылок</h3>
              <button
                type="button"
                onClick={addColumn}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-['Inter'] hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                Добавить колонку
              </button>
            </div>
            <div className="space-y-3">
              {form.linkColumns.map((column, colIndex) => (
                <div key={colIndex} className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-start justify-between mb-2">
                    <input
                      type="text"
                      value={column.title}
                      onChange={(e) => handleColumnTitleChange(colIndex, e.target.value)}
                      className="w-64 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                      placeholder="Заголовок колонки"
                    />
                    <button
                      type="button"
                      onClick={() => removeColumn(colIndex)}
                      className="p-1.5 text-stone-400 hover:text-red-500 cursor-pointer"
                      aria-label="Удалить колонку"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <div key={linkIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={link.label}
                          onChange={(e) => handleLinkChange(colIndex, linkIndex, 'label', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                          placeholder="Текст ссылки"
                        />
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => handleLinkChange(colIndex, linkIndex, 'href', e.target.value)}
                          className="w-40 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                          placeholder="URL"
                        />
                        <button
                          type="button"
                          onClick={() => removeLink(colIndex, linkIndex)}
                          className="p-2 text-stone-400 hover:text-red-500 cursor-pointer"
                          aria-label="Удалить ссылку"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLink(colIndex)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-stone-200 text-stone-700 rounded-full text-xs font-['Inter'] hover:bg-stone-300 transition-colors cursor-pointer"
                    >
                      <Plus size={12} />
                      Добавить ссылку
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Нижняя полоса */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Копирайт</label>
              <input
                type="text"
                value={form.copyright}
                onChange={(e) => handleChange('copyright', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Текст "Сделано с"</label>
              <input
                type="text"
                value={form.madeWith}
                onChange={(e) => handleChange('madeWith', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
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

export default function Footer() {
  const { isAdmin } = useAuth();
  const { footerContent, updateFooterContent } = useSiteContent();
  const [editOpen, setEditOpen] = useState(false);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSave = (content: FooterContent) => {
    updateFooterContent(content);
    toast.success('Футер обновлён');
    setEditOpen(false);
  };

  return (
    <footer className="relative bg-stone-950 text-stone-400">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={footerContent.ctaBgImage}
            alt="Фон с десертами"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-rose-950/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <span className="inline-block font-['Dancing_Script'] text-rose-300 text-3xl mb-4">
            {footerContent.ctaPreTitle}
          </span>
          <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">
            {footerContent.ctaHeading}
          </h3>
          <p className="font-['Inter'] text-rose-200/70 mb-8 max-w-md mx-auto">
            {footerContent.ctaDescription}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.target as HTMLFormElement).querySelector('input');
              if (input) input.value = '';
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder={footerContent.ctaPlaceholder}
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 font-['Inter'] text-sm focus:outline-none focus:border-rose-400 focus:bg-white/15 transition-all duration-200"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-rose-500 hover:bg-rose-400 text-white rounded-full font-['Inter'] font-semibold text-sm transition-colors duration-300 whitespace-nowrap cursor-pointer shadow-lg shadow-rose-900/50"
            >
              {footerContent.ctaButtonText}
            </button>
          </form>
        </div>
      </div>

      {/* Основная сетка футера */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Бренд */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span className="font-['Dancing_Script'] text-3xl font-bold text-white block leading-none">
                {footerContent.brandName}
              </span>
              <span className="font-['Playfair_Display'] text-xs uppercase tracking-[0.3em] text-rose-400">
                {footerContent.brandSubName}
              </span>
            </div>
            <p className="font-['Inter'] text-sm leading-relaxed mb-6 max-w-xs">
              {footerContent.description}
            </p>
            <div className="flex gap-3">
              {footerContent.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 hover:bg-rose-700 hover:border-rose-700 hover:text-white transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d={social.svgPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Колонки ссылок */}
          {footerContent.linkColumns.map((column, index) => (
            <div key={index}>
              <h4 className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-white mb-5">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="font-['Inter'] text-sm text-stone-500 hover:text-rose-400 transition-colors duration-200 cursor-pointer text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя полоса */}
        <div className="border-t border-white/5 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Inter'] text-xs text-stone-600">
            {footerContent.copyright}
          </p>
          <p className="font-['Inter'] text-xs text-stone-600 flex items-center gap-1.5">
            {footerContent.madeWith} <Heart size={11} className="fill-rose-600 text-rose-600 mx-0.5" /> в Лондоне
          </p>
        </div>
      </div>

      {/* Кнопка редактирования для админа */}
      {isAdmin && (
        <button
          onClick={() => setEditOpen(true)}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
          aria-label="Редактировать футер"
        >
          <Pencil size={16} />
          <span className="font-['Inter'] text-sm">Редактировать</span>
        </button>
      )}

      {editOpen && (
        <FooterEditModal
          initial={footerContent}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </footer>
  );
}
