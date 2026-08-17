import type { Dessert, Testimonial, NavLink } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Главная', href: '#home' },
  { label: 'О нас', href: '#about' },
  { label: 'Меню', href: '#menu' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contact' },
];

export const desserts: Dessert[] = [
  {
    id: 1,
    name: 'Розовый бархатный торт',
    description: 'Слои нежного красного бархатного бисквита с розовым кремом-чизом и съедобными лепестками.',
    price: 8.5,
    category: 'cakes',
    image: 'https://images.pexels.com/photos/19499006/pexels-photo-19499006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Хит продаж',
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: 2,
    name: 'Французские макаруны',
    description: 'Нежные миндальные половинки с шелковистым ганашем в сезонных вкусах: фисташка, малина и ваниль.',
    price: 3.2,
    category: 'macarons',
    image: 'https://images.pexels.com/photos/12927171/pexels-photo-12927171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Новинка',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 3,
    name: 'Опера',
    description: 'Классические парижские слои миндального бисквита с кофейным кремом и глазурью из тёмного шоколада.',
    price: 7.9,
    category: 'cakes',
    image: 'https://images.pexels.com/photos/12124906/pexels-photo-12124906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Тарт с лимонным курдом',
    description: 'Хрустящая песочная основа с пикантным лимонным курдом и итальянской меренгой.',
    price: 6.5,
    category: 'tarts',
    image: 'https://images.pexels.com/photos/34569681/pexels-photo-34569681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Милле-фей',
    description: 'Три слоя карамелизированного слоёного теста с ванильным заварным кремом из мадагаскарской ванили.',
    price: 7.0,
    category: 'pastries',
    image: 'https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Выбор шефа',
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: 6,
    name: 'Коробка тёмных трюфелей',
    description: 'Трюфели ручной работы из 70% какао с начинкой из солёной карамели, обваленные в какао-порошке.',
    price: 12.0,
    category: 'chocolates',
    image: 'https://images.pexels.com/photos/27304325/pexels-photo-27304325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Новинка',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 7,
    name: 'Клубничный эклер',
    description: 'Лёгкое заварное тесто с клубничным кремом, покрытое розовым шоколадом.',
    price: 5.5,
    category: 'pastries',
    image: 'https://images.pexels.com/photos/17869890/pexels-photo-17869890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Солёный карамельный тарт',
    description: 'Насыщенная солёная карамель в тёмной какао-основе, украшенная флёр-де-сель и золотым листом.',
    price: 6.8,
    category: 'tarts',
    image: 'https://images.pexels.com/photos/34073612/pexels-photo-34073612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.5,
  },
];

export const galleryImages = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/34073612/pexels-photo-34073612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Элегантная витрина с десертами',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/17869890/pexels-photo-17869890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Ассорти изысканных тортов',
    span: '',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/12927171/pexels-photo-12927171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Синие бархатные десерты',
    span: '',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Композиция из мини-тортов',
    span: '',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/27304325/pexels-photo-27304325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Витрина кондитерской',
    span: '',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/19499006/pexels-photo-19499006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Авторские торты крупным планом',
    span: '',
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/12124906/pexels-photo-12124906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Изысканные пирожные',
    span: '',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Софи Лоран',
    avatar: 'SL',
    rating: 5,
    text: 'Абсолютно божественно! Розовый бархатный торт стал главным украшением моей свадьбы, и все гости были в восторге. Настоящее искусство на тарелке.',
    date: 'Март 2025',
  },
  {
    id: 2,
    name: 'Джеймс Уитфилд',
    avatar: 'JW',
    rating: 5,
    text: 'Я бывал в кондитерских Парижа, Вены и Лондона. Unique Desserts стоит в одном ряду с лучшими. Их макаруны исключительны.',
    date: 'Январь 2025',
  },
  {
    id: 3,
    name: 'Амара Осей',
    avatar: 'AO',
    rating: 5,
    text: 'Каждый кусочек — это путешествие. Коробка тёмных трюфелей была шедевром — карамельная середина с морской солью не похожа ни на что, что я пробовала раньше.',
    date: 'Апрель 2025',
  },
  {
    id: 4,
    name: 'Елена Маркетти',
    avatar: 'EM',
    rating: 5,
    text: 'Заказывала милле-фей и лимонный тарт для званого ужина. Мои гости не могли перестать о них говорить. Обязательно закажу снова!',
    date: 'Февраль 2025',
  },
];

export const categories = [
  { id: 'all', label: 'Все' },
  { id: 'cakes', label: 'Торты' },
  { id: 'macarons', label: 'Макаруны' },
  { id: 'pastries', label: 'Пирожные' },
  { id: 'tarts', label: 'Тарты' },
  { id: 'chocolates', label: 'Шоколад' },
] as const;

export const stats = [
  { value: '12+', label: 'Лет мастерства' },
  { value: '200+', label: 'Уникальных рецептов' },
  { value: '50k+', label: 'Довольных клиентов' },
  { value: '18', label: 'Наград получено' },
];
