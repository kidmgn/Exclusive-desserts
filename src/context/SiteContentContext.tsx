import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  desserts as defaultDesserts,
  categories as defaultCategories,
  stats as defaultStats,
  galleryImages as defaultGalleryImages,
  testimonials as defaultTestimonials,
} from '../data';
import type { Dessert, DessertCategory } from '../types';

export interface Category {
  id: string;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  preTitle: string;
  heading1: string;
  heading2: string;
  subtitle: string;
  primaryBtnText: string;
  secondaryBtnText: string;
  bgImage: string;
  stats: HeroStat[];
}

const defaultHeroContent: HeroContent = {
  preTitle: 'Кондитерская с 2012 года',
  heading1: 'Каждый кусочек',
  heading2: 'со своей историей',
  subtitle: 'Десерты ручной работы, созданные с любовью, точностью и из лучших ингредиентов — с доставкой до двери.',
  primaryBtnText: 'Смотреть меню',
  secondaryBtnText: 'Наша история',
  bgImage: 'https://images.pexels.com/photos/34073612/pexels-photo-34073612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=1200',
  stats: [
    { value: '200+', label: 'Рецептов' },
    { value: '50 000+', label: 'Клиентов' },
    { value: '18', label: 'Наград' },
    { value: '12+', label: 'Лет мастерства' },
  ],
};

export interface AboutValue {
  icon: 'award' | 'leaf' | 'heart' | 'clock';
  title: string;
  desc: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  preTitle: string;
  heading1: string;
  heading2: string;
  paragraph1: string;
  paragraph2: string;
  mainImage: string;
  secondaryImage: string;
  badgeText: string;
  badgeSubtext: string;
  awardNumber: string;
  awardLabel: string;
  values: AboutValue[];
  stats: AboutStat[];
}

const defaultAboutContent: AboutContent = {
  preTitle: 'Наша история',
  heading1: 'Страсть, запечённая',
  heading2: 'в каждом десерте',
  paragraph1:
    'Основанная в 2012 году шеф-кондитером Изабель Моро, компания Unique Desserts родилась из простой веры: по-настоящему исключительные сладости должны быть доступны каждому. То, что начиналось как небольшая мастерская в парижском стиле, превратилось в отмеченную наградами кондитерскую, известную по всей стране.',
  paragraph2:
    'Каждое утро наша команда приходит до рассвета, чтобы приготовить свежее тесто, темперировать шоколад высшего сорта и отсадить изысканно нежные кремы. Мы никогда не торопимся и никогда не идём на компромиссы.',
  mainImage:
    'https://images.pexels.com/photos/19499006/pexels-photo-19499006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700',
  secondaryImage:
    'https://images.pexels.com/photos/12927171/pexels-photo-12927171.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=200',
  badgeText: '12+',
  badgeSubtext: 'Лет мастерства',
  awardNumber: '18',
  awardLabel: 'наград',
  values: [
    {
      icon: 'award',
      title: 'Мастерство, отмеченное наградами',
      desc: '18 международных наград за мастерство в кондитерском искусстве, признанных Кулинарным институтом Франции.',
    },
    {
      icon: 'leaf',
      title: 'Лучшие ингредиенты',
      desc: 'Мы используем органическую муку, шоколад из одного региона и свежие сезонные продукты каждое утро.',
    },
    {
      icon: 'heart',
      title: 'Сделано с любовью',
      desc: 'Каждый десерт готовится вручную небольшими партиями, чтобы гарантировать безупречное качество и стабильность.',
    },
    {
      icon: 'clock',
      title: 'Доставка в день заказа',
      desc: 'Закажите до полудня, и ваши десерты ручной работы будут доставлены свежими к двери в тот же день.',
    },
  ],
  stats: defaultStats.map((s) => ({ value: s.value, label: s.label })),
};

export interface SeasonalContent {
  preTitle: string;
  heading1: string;
  heading2: string;
  description: string;
  primaryBtnPrefix: string;
  secondaryBtnText: string;
  image1: string;
  image2: string;
  priceText: string;
  priceValue: string;
  featuredId: number | null;
}

const defaultSeasonalContent: SeasonalContent = {
  preTitle: 'Сезонное предложение',
  heading1: 'Летнее вдохновение',
  heading2: 'Коллекция вкусов',
  description:
    'Каждый сезон приносит новое вдохновение. Наша летняя коллекция воспевает спелые ягоды, цветочные настои и нежную сладость сезонных продуктов.',
  primaryBtnPrefix: 'Попробовать',
  secondaryBtnText: 'Смотреть всю коллекцию',
  image1: 'https://images.pexels.com/photos/34569681/pexels-photo-34569681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=400',
  image2: 'https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=400',
  priceText: 'Цена от',
  priceValue: '350 ₽',
  featuredId: null,
};

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  span: string;
}

export interface GalleryContent {
  preTitle: string;
  heading: string;
  description: string;
  instagramText: string;
  instagramUrl: string;
  images: GalleryImage[];
}

const defaultGalleryContent: GalleryContent = {
  preTitle: 'Gallery',
  heading: 'A Feast for the Eyes',
  description: 'Before your first bite, let your eyes savour the artistry that goes into every creation.',
  instagramText: 'Follow our journey on Instagram for daily inspiration',
  instagramUrl: '#',
  images: defaultGalleryImages.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    span: img.span,
  })),
};

export interface ReviewItem {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface ReviewsContent {
  preTitle: string;
  heading: string;
  description: string;
  overallRating: string;
  totalReviews: string;
  mode: 'demo' | 'real';
  items: ReviewItem[];
  realItems: ReviewItem[];
}

const defaultReviewsContent: ReviewsContent = {
  preTitle: 'Отзывы',
  heading: 'Что говорят наши гости',
  description: 'Настоящие слова от настоящих людей, попробовавших наши творения.',
  overallRating: '4.9',
  totalReviews: '2 400+',
  mode: 'demo',
  items: defaultTestimonials.map((t) => ({
    id: t.id,
    name: t.name,
    avatar: t.avatar,
    rating: t.rating,
    text: t.text,
    date: t.date,
  })),
  realItems: [],
};

export interface ContactDetail {
  icon: 'map' | 'phone' | 'mail' | 'clock';
  title: string;
  lines: string[];
}

export interface ContactContent {
  preTitle: string;
  heading: string;
  description: string;
  details: ContactDetail[];
  mapTitle: string;
  mapAddress: string;
  mapLink: string;
  formLabels: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  formPlaceholders: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  formSubmitText: string;
  successTitle: string;
  successText: string;
  subjectOptions: string[];
}

const defaultContactContent: ContactContent = {
  preTitle: 'Свяжитесь с нами',
  heading: 'Будем рады вас услышать',
  description: 'Планируете особенное событие или просто хотите узнать о нашем меню — мы всегда на связи.',
  details: [
    {
      icon: 'map',
      title: 'Навестите нас',
      lines: ['Лондон, Мейфэр', 'Блоссом Лейн, 14'],
    },
    {
      icon: 'phone',
      title: 'Позвоните нам',
      lines: ['+44 (0)20 7946 0321', 'Пн–Сб, 9:00–18:00'],
    },
    {
      icon: 'mail',
      title: 'Напишите нам',
      lines: ['hello@uniquedesserts.co.uk', 'Отвечаем в течение 24 часов'],
    },
    {
      icon: 'clock',
      title: 'Часы работы',
      lines: ['Пн–Пт: 8:00–19:00', 'Сб–Вс: 9:00–17:00'],
    },
  ],
  mapTitle: 'Блоссом Лейн, 14',
  mapAddress: 'Мейфэр, Лондон W1K 3BN',
  mapLink: 'https://maps.google.com',
  formLabels: {
    name: 'Полное имя *',
    email: 'Email адрес *',
    subject: 'Тема *',
    message: 'Сообщение *',
  },
  formPlaceholders: {
    name: 'Иван Петров',
    email: 'ivan@example.com',
    subject: 'Выберите тему…',
    message: 'Расскажите о вашем запросе…',
  },
  formSubmitText: 'Отправить сообщение',
  successTitle: 'Сообщение получено!',
  successText: 'Спасибо, что обратились к нам. Наша команда ответит вам в течение 24 часов.',
  subjectOptions: [
    'Общий вопрос',
    'Индивидуальный заказ',
    'Свадебный торт',
    'Корпоративное мероприятие',
    'Вопрос по доставке',
    'Отзыв',
  ],
};

export interface SocialLink {
  label: string;
  href: string;
  svgPath: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  brandName: string;
  brandSubName: string;
  description: string;
  socialLinks: SocialLink[];
  linkColumns: FooterLinkColumn[];
  copyright: string;
  madeWith: string;
  ctaPreTitle: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaPlaceholder: string;
  ctaButtonText: string;
  ctaBgImage: string;
}

const defaultFooterContent: FooterContent = {
  brandName: 'Уникальные',
  brandSubName: 'Десерты',
  description: 'Отмеченная наградами кондитерская в самом сердце Лондона. Мы создаём незабываемые десерты со страстью, точностью и из лучших ингредиентов мира.',
  socialLinks: [
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
  ],
  linkColumns: [
    {
      title: 'Быстрые ссылки',
      links: [
        { label: 'Главная', href: '#home' },
        { label: 'О нас', href: '#about' },
        { label: 'Меню', href: '#menu' },
        { label: 'Галерея', href: '#gallery' },
        { label: 'Отзывы', href: '#reviews' },
        { label: 'Контакты', href: '#contact' },
      ],
    },
    {
      title: 'Наши специализации',
      links: [
        { label: 'Свадебные торты', href: '#menu' },
        { label: 'Сезонные макаруны', href: '#menu' },
        { label: 'Авторский шоколад', href: '#menu' },
        { label: 'Корпоративные мероприятия', href: '#contact' },
        { label: 'Индивидуальные заказы', href: '#contact' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { label: 'Информация об аллергенах', href: '#' },
        { label: 'Условия доставки', href: '#' },
        { label: 'Политика конфиденциальности', href: '#' },
        { label: 'Условия использования', href: '#' },
        { label: 'Частые вопросы', href: '#' },
      ],
    },
  ],
  copyright: '© 2025 Уникальные десерты. Все права защищены.',
  madeWith: 'Сделано с',
  ctaPreTitle: 'Сладкое приглашение',
  ctaHeading: 'Готовы побаловать себя?',
  ctaDescription: 'Присоединяйтесь к 50 000 довольных клиентов, которые получают наши свежие десерты. Подпишитесь на эксклюзивные предложения и уведомления о новинках.',
  ctaPlaceholder: 'ваш@email.ru',
  ctaButtonText: 'Подписаться',
  ctaBgImage: 'https://images.pexels.com/photos/17869890/pexels-photo-17869890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=1400',
};

interface SiteContentContextValue {
  desserts: Dessert[];
  realDesserts: Dessert[];
  dessertsMode: 'demo' | 'real';
  categories: Category[];
  heroContent: HeroContent;
  aboutContent: AboutContent;
  seasonalContent: SeasonalContent;
  galleryContent: GalleryContent;
  reviewsContent: ReviewsContent;
  contactContent: ContactContent;
  footerContent: FooterContent;
  addDessert: (dessert: Dessert) => void;
  updateDessert: (dessert: Dessert) => void;
  deleteDessert: (id: number) => void;
  addRealDessert: (dessert: Dessert) => void;
  updateRealDessert: (dessert: Dessert) => void;
  deleteRealDessert: (id: number) => void;
  setDessertsMode: (mode: 'demo' | 'real') => void;
  addCategory: (category: Category) => void;
  updateCategory: (id: string, label: string) => void;
  deleteCategory: (id: string) => void;
  updateHeroContent: (content: HeroContent) => void;
  updateAboutContent: (content: AboutContent) => void;
  updateSeasonalContent: (content: SeasonalContent) => void;
  updateGalleryContent: (content: GalleryContent) => void;
  updateReviewsContent: (content: ReviewsContent) => void;
  updateContactContent: (content: ContactContent) => void;
  updateFooterContent: (content: FooterContent) => void;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const STORAGE_KEY = 'siteContent';

const initialCategories: Category[] = defaultCategories.map((c) => ({
  id: c.id,
  label: c.label,
}));

interface StoredContent {
  desserts: Dessert[];
  realDesserts: Dessert[];
  dessertsMode: 'demo' | 'real';
  categories: Category[];
  heroContent: HeroContent;
  aboutContent: AboutContent;
  seasonalContent: SeasonalContent;
  galleryContent: GalleryContent;
  reviewsContent: ReviewsContent;
  contactContent: ContactContent;
  footerContent: FooterContent;
}

const loadContent = (): StoredContent => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        parsed &&
        Array.isArray(parsed.desserts) &&
        Array.isArray(parsed.categories) &&
        parsed.heroContent &&
        parsed.aboutContent &&
        parsed.seasonalContent &&
        parsed.galleryContent &&
        parsed.reviewsContent
      ) {
        const realDesserts = Array.isArray(parsed.realDesserts) ? parsed.realDesserts as Dessert[] : [];
        const dessertsMode = parsed.dessertsMode === 'real' ? 'real' : 'demo';
        const reviewsContent = parsed.reviewsContent as ReviewsContent;
        if (!reviewsContent.mode) reviewsContent.mode = 'demo';
        if (!reviewsContent.realItems) reviewsContent.realItems = [];
        const contactContent = parsed.contactContent || defaultContactContent;
        const footerContent = parsed.footerContent || defaultFooterContent;

        return {
          desserts: parsed.desserts as Dessert[],
          realDesserts,
          dessertsMode,
          categories: parsed.categories as Category[],
          heroContent: parsed.heroContent as HeroContent,
          aboutContent: parsed.aboutContent as AboutContent,
          seasonalContent: parsed.seasonalContent as SeasonalContent,
          galleryContent: parsed.galleryContent as GalleryContent,
          reviewsContent: reviewsContent,
          contactContent: contactContent,
          footerContent: footerContent,
        };
      }
    }
  } catch (e) {
    console.warn('Не удалось загрузить контент из localStorage', e);
  }
  return {
    desserts: defaultDesserts,
    realDesserts: [],
    dessertsMode: 'demo',
    categories: initialCategories,
    heroContent: defaultHeroContent,
    aboutContent: defaultAboutContent,
    seasonalContent: defaultSeasonalContent,
    galleryContent: defaultGalleryContent,
    reviewsContent: defaultReviewsContent,
    contactContent: defaultContactContent,
    footerContent: defaultFooterContent,
  };
};

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [desserts, setDesserts] = useState<Dessert[]>(() => loadContent().desserts);
  const [realDesserts, setRealDesserts] = useState<Dessert[]>(() => loadContent().realDesserts);
  const [dessertsMode, setDessertsMode] = useState<'demo' | 'real'>(() => loadContent().dessertsMode);
  const [categories, setCategories] = useState<Category[]>(() => loadContent().categories);
  const [heroContent, setHeroContent] = useState<HeroContent>(() => loadContent().heroContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(() => loadContent().aboutContent);
  const [seasonalContent, setSeasonalContent] = useState<SeasonalContent>(() => loadContent().seasonalContent);
  const [galleryContent, setGalleryContent] = useState<GalleryContent>(() => loadContent().galleryContent);
  const [reviewsContent, setReviewsContent] = useState<ReviewsContent>(() => loadContent().reviewsContent);
  const [contactContent, setContactContent] = useState<ContactContent>(() => loadContent().contactContent);
  const [footerContent, setFooterContent] = useState<FooterContent>(() => loadContent().footerContent);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          desserts,
          realDesserts,
          dessertsMode,
          categories,
          heroContent,
          aboutContent,
          seasonalContent,
          galleryContent,
          reviewsContent,
          contactContent,
          footerContent,
        })
      );
    } catch (e) {
      console.warn('Не удалось сохранить контент в localStorage', e);
    }
  }, [desserts, realDesserts, dessertsMode, categories, heroContent, aboutContent, seasonalContent, galleryContent, reviewsContent, contactContent, footerContent]);

  const addDessert = useCallback((dessert: Dessert) => {
    setDesserts((prev) => [...prev, dessert]);
  }, []);

  const updateDessert = useCallback((dessert: Dessert) => {
    setDesserts((prev) => prev.map((d) => (d.id === dessert.id ? dessert : d)));
  }, []);

  const deleteDessert = useCallback((id: number) => {
    setDesserts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const addRealDessert = useCallback((dessert: Dessert) => {
    setRealDesserts((prev) => [...prev, dessert]);
  }, []);

  const updateRealDessert = useCallback((dessert: Dessert) => {
    setRealDesserts((prev) => prev.map((d) => (d.id === dessert.id ? dessert : d)));
  }, []);

  const deleteRealDessert = useCallback((id: number) => {
    setRealDesserts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const addCategory = useCallback((category: Category) => {
    setCategories((prev) => [...prev, category]);
  }, []);

  const updateCategory = useCallback((id: string, label: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, label } : c)));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateHeroContent = useCallback((content: HeroContent) => {
    setHeroContent(content);
  }, []);

  const updateAboutContent = useCallback((content: AboutContent) => {
    setAboutContent(content);
  }, []);

  const updateSeasonalContent = useCallback((content: SeasonalContent) => {
    setSeasonalContent(content);
  }, []);

  const updateGalleryContent = useCallback((content: GalleryContent) => {
    setGalleryContent(content);
  }, []);

  const updateReviewsContent = useCallback((content: ReviewsContent) => {
    setReviewsContent(content);
  }, []);

  const updateContactContent = useCallback((content: ContactContent) => {
    setContactContent(content);
  }, []);

  const updateFooterContent = useCallback((content: FooterContent) => {
    setFooterContent(content);
  }, []);

  const resetContent = useCallback(() => {
    setDesserts(defaultDesserts);
    setRealDesserts([]);
    setDessertsMode('demo');
    setCategories(initialCategories);
    setHeroContent(defaultHeroContent);
    setAboutContent(defaultAboutContent);
    setSeasonalContent(defaultSeasonalContent);
    setGalleryContent(defaultGalleryContent);
    setReviewsContent(defaultReviewsContent);
    setContactContent(defaultContactContent);
    setFooterContent(defaultFooterContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Не удалось очистить localStorage', e);
    }
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        desserts,
        realDesserts,
        dessertsMode,
        categories,
        heroContent,
        aboutContent,
        seasonalContent,
        galleryContent,
        reviewsContent,
        contactContent,
        footerContent,
        addDessert,
        updateDessert,
        deleteDessert,
        addRealDessert,
        updateRealDessert,
        deleteRealDessert,
        setDessertsMode,
        addCategory,
        updateCategory,
        deleteCategory,
        updateHeroContent,
        updateAboutContent,
        updateSeasonalContent,
        updateGalleryContent,
        updateReviewsContent,
        updateContactContent,
        updateFooterContent,
        resetContent,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
}