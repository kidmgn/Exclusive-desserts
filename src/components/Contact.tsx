import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Pencil, X, Plus, Trash2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type ContactContent, type ContactDetail } from '../context/SiteContentContext';
import toast from 'react-hot-toast';

const iconMap = {
  map: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

function ContactEditModal({ initial, onSave, onClose }: {
  initial: ContactContent;
  onSave: (content: ContactContent) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ContactContent>({
    ...initial,
    details: initial.details.map((d) => ({ ...d, lines: [...d.lines] })),
    subjectOptions: [...initial.subjectOptions],
    formLabels: { ...initial.formLabels },
    formPlaceholders: { ...initial.formPlaceholders },
  });

  const handleChange = (field: keyof Omit<ContactContent, 'details' | 'subjectOptions' | 'formLabels' | 'formPlaceholders'>, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLabelChange = (field: keyof ContactContent['formLabels'], value: string) => {
    setForm((prev) => ({
      ...prev,
      formLabels: { ...prev.formLabels, [field]: value },
    }));
  };

  const handlePlaceholderChange = (field: keyof ContactContent['formPlaceholders'], value: string) => {
    setForm((prev) => ({
      ...prev,
      formPlaceholders: { ...prev.formPlaceholders, [field]: value },
    }));
  };

  const handleDetailChange = (index: number, field: keyof ContactDetail, value: string | string[]) => {
    setForm((prev) => {
      const newDetails = [...prev.details];
      newDetails[index] = { ...newDetails[index], [field]: value };
      return { ...prev, details: newDetails };
    });
  };

  const handleLineChange = (detailIndex: number, lineIndex: number, value: string) => {
    setForm((prev) => {
      const newDetails = [...prev.details];
      const newLines = [...newDetails[detailIndex].lines];
      newLines[lineIndex] = value;
      newDetails[detailIndex] = { ...newDetails[detailIndex], lines: newLines };
      return { ...prev, details: newDetails };
    });
  };

  const addDetail = () => {
    const newDetail: ContactDetail = {
      icon: 'map',
      title: 'Новый контакт',
      lines: ['', ''],
    };
    setForm((prev) => ({ ...prev, details: [...prev.details, newDetail] }));
  };

  const removeDetail = (index: number) => {
    setForm((prev) => {
      const newDetails = [...prev.details];
      newDetails.splice(index, 1);
      return { ...prev, details: newDetails };
    });
  };

  const handleSubjectOptionChange = (index: number, value: string) => {
    setForm((prev) => {
      const newOptions = [...prev.subjectOptions];
      newOptions[index] = value;
      return { ...prev, subjectOptions: newOptions };
    });
  };

  const addSubjectOption = () => {
    setForm((prev) => ({ ...prev, subjectOptions: [...prev.subjectOptions, ''] }));
  };

  const removeSubjectOption = (index: number) => {
    setForm((prev) => {
      const newOptions = [...prev.subjectOptions];
      newOptions.splice(index, 1);
      return { ...prev, subjectOptions: newOptions };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.heading.trim() || !form.description.trim()) {
      toast.error('Заполните заголовок и описание');
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
          Редактирование контактов
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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
            <div className="md:col-span-2">
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Описание</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm resize-none"
                rows={2}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-['Inter'] text-sm font-semibold text-stone-700">Контактные данные</h3>
              <button
                type="button"
                onClick={addDetail}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-['Inter'] hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                Добавить
              </button>
            </div>
            <div className="space-y-3">
              {form.details.map((detail, index) => (
                <div key={index} className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-['Inter'] text-sm font-semibold text-stone-700">Блок {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="p-1.5 text-stone-400 hover:text-red-500 cursor-pointer"
                      aria-label="Удалить блок"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Иконка</label>
                      <select
                        value={detail.icon}
                        onChange={(e) => handleDetailChange(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                      >
                        <option value="map">Карта</option>
                        <option value="phone">Телефон</option>
                        <option value="mail">Почта</option>
                        <option value="clock">Часы</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Заголовок</label>
                      <input
                        type="text"
                        value={detail.title}
                        onChange={(e) => handleDetailChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                      />
                    </div>
                    {detail.lines.map((line, lineIndex) => (
                      <div key={lineIndex} className="md:col-span-3">
                        <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Строка {lineIndex + 1}</label>
                        <input
                          type="text"
                          value={line}
                          onChange={(e) => handleLineChange(index, lineIndex, e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Адрес карты (заголовок)</label>
              <input
                type="text"
                value={form.mapTitle}
                onChange={(e) => handleChange('mapTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Адрес карты (текст)</label>
              <input
                type="text"
                value={form.mapAddress}
                onChange={(e) => handleChange('mapAddress', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Ссылка на Google Maps</label>
              <input
                type="text"
                value={form.mapLink}
                onChange={(e) => handleChange('mapLink', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-['Inter'] text-sm font-semibold text-stone-700 mb-2">Подписи полей формы</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={form.formLabels.name}
                  onChange={(e) => handleLabelChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Имя"
                />
                <input
                  type="text"
                  value={form.formLabels.email}
                  onChange={(e) => handleLabelChange('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={form.formLabels.subject}
                  onChange={(e) => handleLabelChange('subject', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Тема"
                />
                <input
                  type="text"
                  value={form.formLabels.message}
                  onChange={(e) => handleLabelChange('message', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Сообщение"
                />
              </div>
            </div>
            <div>
              <h3 className="font-['Inter'] text-sm font-semibold text-stone-700 mb-2">Плейсхолдеры формы</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={form.formPlaceholders.name}
                  onChange={(e) => handlePlaceholderChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Иван Петров"
                />
                <input
                  type="text"
                  value={form.formPlaceholders.email}
                  onChange={(e) => handlePlaceholderChange('email', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="ivan@example.com"
                />
                <input
                  type="text"
                  value={form.formPlaceholders.subject}
                  onChange={(e) => handlePlaceholderChange('subject', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Выберите тему…"
                />
                <input
                  type="text"
                  value={form.formPlaceholders.message}
                  onChange={(e) => handlePlaceholderChange('message', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  placeholder="Расскажите о вашем запросе…"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-['Inter'] text-sm font-semibold text-stone-700 mb-2">Темы письма (select options)</h3>
            <div className="space-y-2">
              {form.subjectOptions.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleSubjectOptionChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubjectOption(index)}
                    className="p-2 text-stone-400 hover:text-red-500 cursor-pointer"
                    aria-label="Удалить тему"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubjectOption}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-['Inter'] hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                Добавить тему
              </button>
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

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { ref: leftRef, inView: leftInView } = useScrollAnimation();
  const { ref: rightRef, inView: rightInView } = useScrollAnimation();
  const { isAdmin } = useAuth();
  const { contactContent, updateContactContent } = useSiteContent();

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Укажите имя';
    if (!form.email.trim()) {
      newErrors.email = 'Укажите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!form.subject.trim()) newErrors.subject = 'Укажите тему';
    if (!form.message.trim()) newErrors.message = 'Введите сообщение';
    else if (form.message.trim().length < 20) newErrors.message = 'Сообщение должно содержать не менее 20 символов';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success('Сообщение отправлено! Мы скоро свяжемся с вами.', {
      style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px' },
    });
  };

  const handleSave = (content: ContactContent) => {
    updateContactContent(content);
    toast.success('Контакты обновлены');
    setEditOpen(false);
  };

  const iconComponents = {
    map: MapPin,
    phone: Phone,
    mail: Mail,
    clock: Clock,
  };

  return (
    <section id="contact" className="relative py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-['Dancing_Script'] text-rose-500 text-2xl mb-3">
            {contactContent.preTitle}
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            {contactContent.heading}
          </h2>
          <p className="font-['Inter'] text-stone-500 max-w-md mx-auto">
            {contactContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: info */}
          <div
            ref={leftRef}
            className={`transition-all duration-700 ${
              leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {contactContent.details.map((detail, idx) => {
                const Icon = iconComponents[detail.icon];
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 hover:bg-rose-50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-rose-600" />
                    </div>
                    <h3 className="font-['Inter'] font-semibold text-stone-800 text-sm mb-1">{detail.title}</h3>
                    {detail.lines.map((line, lineIdx) => (
                      <p key={lineIdx} className="font-['Inter'] text-stone-500 text-xs">{line}</p>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-rose-100 shadow-sm" style={{ height: 280 }}>
              <div className="w-full h-full bg-gradient-to-br from-rose-50 to-stone-100 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
                  <MapPin size={24} className="text-rose-600" />
                </div>
                <div className="text-center">
                  <p className="font-['Playfair_Display'] text-stone-700 font-semibold">{contactContent.mapTitle}</p>
                  <p className="font-['Inter'] text-stone-500 text-sm">{contactContent.mapAddress}</p>
                </div>
                <a
                  href={contactContent.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-5 py-2 bg-rose-700 text-white rounded-full font-['Inter'] text-xs font-semibold hover:bg-rose-800 transition-colors cursor-pointer"
                >
                  Открыть в Google Картах
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            ref={rightRef}
            className={`transition-all duration-700 delay-200 ${
              rightInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6 animate-scale-in">
                  <CheckCircle size={40} className="text-emerald-500" />
                </div>
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900 mb-3">
                  {contactContent.successTitle}
                </h3>
                <p className="font-['Inter'] text-stone-500 max-w-sm">
                  {contactContent.successText}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 px-6 py-2.5 border-2 border-rose-300 text-rose-700 rounded-full font-['Inter'] text-sm font-semibold hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  Отправить ещё одно сообщение
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                      {contactContent.formLabels.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={contactContent.formPlaceholders.name}
                      className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 ${
                        errors.name ? 'border-red-300 focus:ring-red-100' : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                      }`}
                    />
                    {errors.name && <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                      {contactContent.formLabels.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={contactContent.formPlaceholders.email}
                      className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 ${
                        errors.email ? 'border-red-300 focus:ring-red-100' : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                      }`}
                    />
                    {errors.email && <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                    {contactContent.formLabels.subject}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 cursor-pointer ${
                      errors.subject ? 'border-red-300 focus:ring-red-100' : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                    }`}
                  >
                    <option value="">{contactContent.formPlaceholders.subject}</option>
                    {contactContent.subjectOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                    {contactContent.formLabels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={contactContent.formPlaceholders.message}
                    className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 resize-none ${
                      errors.message ? 'border-red-300 focus:ring-red-100' : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                    }`}
                  />
                  {errors.message && <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.message}</p>}
                  <p className="font-['Inter'] text-stone-400 text-xs mt-1 text-right">{form.message.length} / 500</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300 text-white rounded-xl font-['Inter'] font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Отправка…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {contactContent.formSubmitText}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка редактирования для админа */}
      {isAdmin && (
        <button
          onClick={() => setEditOpen(true)}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm text-stone-700 border border-stone-200 rounded-full hover:bg-white transition-colors cursor-pointer shadow-sm"
          aria-label="Редактировать контакты"
        >
          <Pencil size={16} />
          <span className="font-['Inter'] text-sm">Редактировать</span>
        </button>
      )}

      {editOpen && (
        <ContactEditModal
          initial={contactContent}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </section>
  );
}
