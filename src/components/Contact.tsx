import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import toast from 'react-hot-toast';

const contactDetails = [
  {
    icon: MapPin,
    title: 'Навестите нас',
    lines: ['Лондон, Мейфэр', 'Блоссом Лейн, 14'],
  },
  {
    icon: Phone,
    title: 'Позвоните нам',
    lines: ['+44 (0)20 7946 0321', 'Пн–Сб, 9:00–18:00'],
  },
  {
    icon: Mail,
    title: 'Напишите нам',
    lines: ['hello@uniquedesserts.co.uk', 'Отвечаем в течение 24 часов'],
  },
  {
    icon: Clock,
    title: 'Часы работы',
    lines: ['Пн–Пт: 8:00–19:00', 'Сб–Вс: 9:00–17:00'],
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref: leftRef, inView: leftInView } = useScrollAnimation();
  const { ref: rightRef, inView: rightInView } = useScrollAnimation();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
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
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Имитация API-запроса
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success('Сообщение отправлено! Мы скоро свяжемся с вами.', {
      style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px' },
    });
  };

  return (
    <section id="contact" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-['Dancing_Script'] text-rose-500 text-2xl mb-3">
            Свяжитесь с нами
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Будем рады вас услышать
          </h2>
          <p className="font-['Inter'] text-stone-500 max-w-md mx-auto">
            Планируете особенное событие или просто хотите узнать о нашем меню — мы всегда на связи.
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
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {contactDetails.map(({ icon: Icon, title, lines }) => (
                <div
                  key={title}
                  className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 hover:bg-rose-50 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-rose-600" />
                  </div>
                  <h3 className="font-['Inter'] font-semibold text-stone-800 text-sm mb-1">{title}</h3>
                  {lines.map((line) => (
                    <p key={line} className="font-['Inter'] text-stone-500 text-xs">{line}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-rose-100 shadow-sm" style={{ height: 280 }}>
              <div className="w-full h-full bg-gradient-to-br from-rose-50 to-stone-100 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
                  <MapPin size={24} className="text-rose-600" />
                </div>
                <div className="text-center">
                  <p className="font-['Playfair_Display'] text-stone-700 font-semibold">Блоссом Лейн, 14</p>
                  <p className="font-['Inter'] text-stone-500 text-sm">Мейфэр, Лондон W1K 3BN</p>
                </div>
                <a
                  href="https://maps.google.com"
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
                  Сообщение получено!
                </h3>
                <p className="font-['Inter'] text-stone-500 max-w-sm">
                  Спасибо, что обратились к нам, {form.name.split(' ')[0]}. Наша команда ответит вам в течение 24 часов.
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
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                      Полное имя *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Иван Петров"
                      className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                      }`}
                    />
                    {errors.name && (
                      <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                      Email адрес *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ivan@example.com"
                      className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                      }`}
                    />
                    {errors.email && (
                      <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                    Тема *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 cursor-pointer ${
                      errors.subject
                        ? 'border-red-300 focus:ring-red-100'
                        : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                    }`}
                  >
                    <option value="">Выберите тему…</option>
                    <option value="general">Общий вопрос</option>
                    <option value="custom-order">Индивидуальный заказ</option>
                    <option value="wedding">Свадебный торт</option>
                    <option value="corporate">Корпоративное мероприятие</option>
                    <option value="delivery">Вопрос по доставке</option>
                    <option value="feedback">Отзыв</option>
                  </select>
                  {errors.subject && (
                    <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Расскажите о вашем запросе…"
                    className={`w-full px-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 resize-none ${
                      errors.message
                        ? 'border-red-300 focus:ring-red-100'
                        : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                    }`}
                  />
                  {errors.message && (
                    <p className="font-['Inter'] text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                  <p className="font-['Inter'] text-stone-400 text-xs mt-1 text-right">
                    {form.message.length} / 500
                  </p>
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
                      Отправить сообщение
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
