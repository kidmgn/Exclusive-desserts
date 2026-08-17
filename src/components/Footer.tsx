import { Heart } from 'lucide-react';
import { navLinks } from '../data';

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'Facebook',
    href: '#',
    svgPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'X (Twitter)',
    href: '#',
    svgPath: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'YouTube',
    href: '#',
    svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

const footerLinks = {
  'Быстрые ссылки': navLinks.map((l) => ({ label: l.label, href: l.href })),
  'Наши специализации': [
    { label: 'Свадебные торты', href: '#menu' },
    { label: 'Сезонные макаруны', href: '#menu' },
    { label: 'Авторский шоколад', href: '#menu' },
    { label: 'Корпоративные мероприятия', href: '#contact' },
    { label: 'Индивидуальные заказы', href: '#contact' },
  ],
  'Информация': [
    { label: 'Информация об аллергенах', href: '#' },
    { label: 'Условия доставки', href: '#' },
    { label: 'Политика конфиденциальности', href: '#' },
    { label: 'Условия использования', href: '#' },
    { label: 'Частые вопросы', href: '#' },
  ],
};

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-400">
      {/* CTA Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/17869890/pexels-photo-17869890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=1400"
            alt="Фон с десертами"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-rose-950/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
          <span className="inline-block font-['Dancing_Script'] text-rose-300 text-3xl mb-4">
            Сладкое приглашение
          </span>
          <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы побаловать себя?
          </h3>
          <p className="font-['Inter'] text-rose-200/70 mb-8 max-w-md mx-auto">
            Присоединяйтесь к 50 000 довольных клиентов, которые получают наши свежие десерты.
            Подпишитесь на эксклюзивные предложения и уведомления о новинках.
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
              placeholder="ваш@email.ru"
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 font-['Inter'] text-sm focus:outline-none focus:border-rose-400 focus:bg-white/15 transition-all duration-200"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-rose-500 hover:bg-rose-400 text-white rounded-full font-['Inter'] font-semibold text-sm transition-colors duration-300 whitespace-nowrap cursor-pointer shadow-lg shadow-rose-900/50"
            >
              Подписаться
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
              <span className="font-['Dancing_Script'] text-3xl font-bold text-white block leading-none">Уникальные</span>
              <span className="font-['Playfair_Display'] text-xs uppercase tracking-[0.3em] text-rose-400">Десерты</span>
            </div>
            <p className="font-['Inter'] text-sm leading-relaxed mb-6 max-w-xs">
              Отмеченная наградами кондитерская в самом сердце Лондона. Мы создаём незабываемые десерты
              со страстью, точностью и из лучших ингредиентов мира.
            </p>
            {/* Социальные иконки */}
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, svgPath }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 hover:bg-rose-700 hover:border-rose-700 hover:text-white transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d={svgPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Колонки ссылок */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-['Inter'] text-xs font-semibold uppercase tracking-widest text-white mb-5">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
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
            © {new Date().getFullYear()} Уникальные десерты. Все права защищены.
          </p>
          <p className="font-['Inter'] text-xs text-stone-600 flex items-center gap-1.5">
            Сделано с <Heart size={11} className="fill-rose-600 text-rose-600 mx-0.5" /> в Лондоне
          </p>
        </div>
      </div>
    </footer>
  );
}
