import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type ReviewsContent } from '../context/SiteContentContext';
import toast from 'react-hot-toast';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useScrollAnimation();
  const { isAdmin } = useAuth();
  const { reviewsContent, updateReviewsContent } = useSiteContent();

  const items = reviewsContent.mode === 'demo' ? reviewsContent.items : reviewsContent.realItems;
  const isDemoMode = reviewsContent.mode === 'demo';

  // Автоматический расчёт общего рейтинга и количества отзывов
  const averageRating = items.length > 0
    ? (items.reduce((sum, item) => sum + item.rating, 0) / items.length).toFixed(1)
    : '0.0';
  const totalCount = items.length;

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  const visible = [
    items[current],
    items[(current + 1) % items.length],
    items[(current + 2) % items.length],
  ];

  const handleModeToggle = (mode: 'demo' | 'real') => {
    const updated: ReviewsContent = { ...reviewsContent, mode };
    updateReviewsContent(updated);
    toast.success(`Режим отзывов: ${mode === 'demo' ? 'демо' : 'настоящие'}`);
    setCurrent(0);
  };

  return (
    <section id="reviews" className="relative py-28 bg-rose-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block font-['Dancing_Script'] text-rose-500 text-2xl mb-3">
            {reviewsContent.preTitle}
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            {reviewsContent.heading}
          </h2>
          <p className="font-['Inter'] text-stone-500 max-w-md mx-auto">
            {reviewsContent.description}
          </p>

          {/* Общий рейтинг и количество отзывов */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-['Playfair_Display'] text-2xl font-bold text-stone-900">{averageRating}</span>
            <span className="font-['Inter'] text-stone-500 text-sm">из {totalCount} отзывов</span>
          </div>

          {/* Переключатель режима для админа */}
          {isAdmin && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="font-['Inter'] text-xs text-stone-500 mr-2">Режим:</span>
              <button
                onClick={() => handleModeToggle('demo')}
                className={`px-4 py-2 rounded-full text-sm font-['Inter'] transition-colors cursor-pointer ${
                  isDemoMode ? 'bg-rose-700 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:bg-rose-50'
                }`}
              >
                Демо
              </button>
              <button
                onClick={() => handleModeToggle('real')}
                className={`px-4 py-2 rounded-full text-sm font-['Inter'] transition-colors cursor-pointer ${
                  !isDemoMode ? 'bg-rose-700 text-white' : 'bg-white text-stone-700 border border-stone-200 hover:bg-rose-50'
                }`}
              >
                Настоящие
              </button>
            </div>
          )}
        </div>

        {/* Если реальные отзывы пусты и выбран режим "реальные" */}
        {!isDemoMode && items.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-['Inter'] text-stone-400 text-sm">
              Пока нет настоящих отзывов. Они появятся позже.
            </p>
          </div>
        ) : (
          <>
            {/* Cards — desktop grid / mobile single */}
            <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
              {visible.map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className={`relative bg-white rounded-3xl p-7 shadow-sm border border-rose-100 transition-all duration-500 ${
                    i === 1 ? 'shadow-xl border-rose-200 -translate-y-2 scale-[1.02]' : 'hover:shadow-md'
                  }`}
                >
                  <Quote size={32} className="text-rose-100 fill-rose-100 mb-4" />
                  <p className="font-['Inter'] text-stone-600 text-sm leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-rose-50 pt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white font-['Inter'] font-bold text-sm flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-['Inter'] font-semibold text-stone-800 text-sm">{t.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRating rating={t.rating} />
                        <span className="font-['Inter'] text-stone-400 text-xs">{t.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile single card */}
            <div className="md:hidden mb-8">
              <div className="bg-white rounded-3xl p-7 shadow-lg border border-rose-100">
                <Quote size={32} className="text-rose-100 fill-rose-100 mb-4" />
                <p className="font-['Inter'] text-stone-600 text-sm leading-relaxed mb-6 italic">
                  "{items[current].text}"
                </p>
                <div className="flex items-center gap-3 border-t border-rose-50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white font-['Inter'] font-bold text-sm flex-shrink-0">
                    {items[current].avatar}
                  </div>
                  <div>
                    <div className="font-['Inter'] font-semibold text-stone-800 text-sm">{items[current].name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarRating rating={items[current].rating} />
                      <span className="font-['Inter'] text-stone-400 text-xs">{items[current].date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border-2 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      i === current ? 'w-6 h-2 bg-rose-600' : 'w-2 h-2 bg-rose-200 hover:bg-rose-400'
                    }`}
                    aria-label={`Перейти к отзыву ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-11 h-11 rounded-full border-2 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Следующий отзыв"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
