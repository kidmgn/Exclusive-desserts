import { useState } from 'react';
import { X, ZoomIn, Pencil, Trash2, Plus, Upload } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type GalleryContent, type GalleryImage } from '../context/SiteContentContext';
import toast from 'react-hot-toast';

function GalleryEditModal({ initial, onSave, onClose }: {
  initial: GalleryContent;
  onSave: (content: GalleryContent) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<GalleryContent>({
    ...initial,
    images: initial.images.map((img) => ({ ...img })),
  });

  const handleChange = (field: keyof Omit<GalleryContent, 'images'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (index: number, field: keyof GalleryImage, value: string) => {
    setForm((prev) => {
      const newImages = [...prev.images];
      newImages[index] = { ...newImages[index], [field]: value };
      return { ...prev, images: newImages };
    });
  };

  const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleImageChange(index, 'src', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    const newImage: GalleryImage = {
      id: Date.now(),
      src: '',
      alt: '',
      span: '',
    };
    setForm((prev) => ({ ...prev, images: [...prev.images, newImage] }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.heading.trim() || !form.description.trim()) {
      toast.error('Заполните заголовок и описание');
      return;
    }
    if (form.images.some((img) => !img.src.trim())) {
      toast.error('У всех изображений должен быть указан URL или загружен файл');
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
          Редактирование галереи
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
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Заголовок</label>
              <input
                type="text"
                value={form.heading}
                onChange={(e) => handleChange('heading', e.target.value)}
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
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Текст Instagram CTA</label>
              <input
                type="text"
                value={form.instagramText}
                onChange={(e) => handleChange('instagramText', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Ссылка Instagram</label>
              <input
                type="text"
                value={form.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-['Inter'] text-sm font-semibold text-stone-700">Изображения</h3>
              <button
                type="button"
                onClick={addImage}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-['Inter'] hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                Добавить
              </button>
            </div>

            <div className="space-y-4">
              {form.images.map((img, index) => (
                <div key={img.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-['Inter'] text-sm font-semibold text-stone-700">Изображение {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1.5 text-stone-400 hover:text-red-500 cursor-pointer"
                      aria-label="Удалить изображение"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">URL изображения</label>
                      <input
                        type="text"
                        value={img.src}
                        onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Alt текст</label>
                      <input
                        type="text"
                        value={img.alt}
                        onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                        placeholder="Описание"
                      />
                    </div>
                    <div>
                      <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Размер в сетке</label>
                      <select
                        value={img.span}
                        onChange={(e) => handleImageChange(index, 'span', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                      >
                        <option value="">Обычный</option>
                        <option value="col-span-2 row-span-2">Большой (2x2)</option>
                        <option value="col-span-2">Широкий (2x1)</option>
                        <option value="row-span-2">Высокий (1x2)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Загрузка файла</label>
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer text-sm font-['Inter']">
                        <Upload size={14} />
                        Загрузить
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload(index)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  {img.src && (
                    <img src={img.src} alt={img.alt} className="mt-2 w-24 h-24 object-cover rounded-xl border" />
                  )}
                </div>
              ))}
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

export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const { ref, inView } = useScrollAnimation();
  const { isAdmin } = useAuth();
  const { galleryContent, updateGalleryContent } = useSiteContent();

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    document.body.style.overflow = '';
  };

  const handleSave = (content: GalleryContent) => {
    updateGalleryContent(content);
    toast.success('Галерея обновлена');
    setEditOpen(false);
  };

  return (
    <>
      <section id="gallery" className="relative py-28 bg-stone-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div
            ref={ref}
            className={`text-center mb-14 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block font-['Dancing_Script'] text-rose-400 text-2xl mb-3">
              {galleryContent.preTitle}
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-4">
              {galleryContent.heading}
            </h2>
            <p className="font-['Inter'] text-stone-400 max-w-lg mx-auto leading-relaxed">
              {galleryContent.description}
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
            {galleryContent.images.map((img, i) => (
              <div
                key={img.id}
                onClick={() => openLightbox(img.src, img.alt)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span} ${
                  i === 0 && !img.span ? 'col-span-2 row-span-2' : ''
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
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-['Inter'] text-white text-xs">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="text-center mt-12">
            <p className="font-['Inter'] text-stone-500 text-sm mb-4">
              {galleryContent.instagramText}
            </p>
            <a
              href={galleryContent.instagramUrl || '#'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-['Inter'] font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @uniquedesserts
            </a>
          </div>
        </div>

        {/* Кнопка редактирования для админа */}
        {isAdmin && (
          <button
            onClick={() => setEditOpen(true)}
            className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Редактировать галерею"
          >
            <Pencil size={16} />
            <span className="font-['Inter'] text-sm">Редактировать</span>
          </button>
        )}

        {editOpen && (
          <GalleryEditModal
            initial={galleryContent}
            onSave={handleSave}
            onClose={() => setEditOpen(false)}
          />
        )}
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
