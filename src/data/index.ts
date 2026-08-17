import type { Dessert, Testimonial, NavLink } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export const desserts: Dessert[] = [
  {
    id: 1,
    name: 'Rose Velvet Cake',
    description: 'Layers of soft red velvet sponge with rose cream cheese frosting and edible petals.',
    price: 8.5,
    category: 'cakes',
    image: 'https://images.pexels.com/photos/19499006/pexels-photo-19499006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Bestseller',
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: 2,
    name: 'French Macarons',
    description: 'Delicate almond shells with silky ganache in seasonal flavours: pistachio, raspberry & vanilla.',
    price: 3.2,
    category: 'macarons',
    image: 'https://images.pexels.com/photos/12927171/pexels-photo-12927171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'New',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 3,
    name: 'Opera Gateau',
    description: 'Classic Parisian layers of joconde sponge, coffee buttercream and dark chocolate glaze.',
    price: 7.9,
    category: 'cakes',
    image: 'https://images.pexels.com/photos/12124906/pexels-photo-12124906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Lemon Curd Tart',
    description: 'Buttery shortcrust shell filled with tangy lemon curd and topped with Italian meringue.',
    price: 6.5,
    category: 'tarts',
    image: 'https://images.pexels.com/photos/34569681/pexels-photo-34569681.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Mille-Feuille',
    description: 'Three layers of caramelised puff pastry with Madagascan vanilla pastry cream.',
    price: 7.0,
    category: 'pastries',
    image: 'https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'Chef\'s Pick',
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: 6,
    name: 'Dark Truffle Box',
    description: 'Handcrafted 70% cacao truffles rolled in cocoa powder with sea salt caramel centres.',
    price: 12.0,
    category: 'chocolates',
    image: 'https://images.pexels.com/photos/27304325/pexels-photo-27304325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    badge: 'New',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 7,
    name: 'Strawberry Éclair',
    description: 'Light choux pastry filled with fresh strawberry cream and dipped in pink chocolate.',
    price: 5.5,
    category: 'pastries',
    image: 'https://images.pexels.com/photos/17869890/pexels-photo-17869890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Caramel Salted Tart',
    description: 'Rich salted caramel in a dark cocoa shell, topped with fleur de sel and gold leaf.',
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
    alt: 'Elegant pastry display',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/17869890/pexels-photo-17869890.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Assorted gourmet cakes',
    span: '',
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/12927171/pexels-photo-12927171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Blue velvet desserts',
    span: '',
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/11522869/pexels-photo-11522869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Mini cakes arrangement',
    span: '',
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/27304325/pexels-photo-27304325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Patisserie display',
    span: '',
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/19499006/pexels-photo-19499006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Artisan cakes close-up',
    span: '',
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/12124906/pexels-photo-12124906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    alt: 'Gourmet pastries',
    span: '',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sophie Laurent',
    avatar: 'SL',
    rating: 5,
    text: 'Absolutely divine! The rose velvet cake was the centrepiece of my wedding and every guest was left speechless. Pure artistry on a plate.',
    date: 'March 2025',
  },
  {
    id: 2,
    name: 'James Whitfield',
    avatar: 'JW',
    rating: 5,
    text: 'I\'ve visited patisseries across Paris, Vienna, and London. Unique Desserts stands shoulder to shoulder with the very best. Their macarons are exceptional.',
    date: 'January 2025',
  },
  {
    id: 3,
    name: 'Amara Osei',
    avatar: 'AO',
    rating: 5,
    text: 'Every single bite is a journey. The dark truffle box was a masterpiece — the sea salt caramel centre is unlike anything I have tasted before.',
    date: 'April 2025',
  },
  {
    id: 4,
    name: 'Elena Marchetti',
    avatar: 'EM',
    rating: 5,
    text: 'Ordered the mille-feuille and the lemon tart for a dinner party. My guests could not stop talking about them. Will absolutely order again!',
    date: 'February 2025',
  },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'macarons', label: 'Macarons' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'tarts', label: 'Tarts' },
  { id: 'chocolates', label: 'Chocolates' },
] as const;

export const stats = [
  { value: '12+', label: 'Years of Craft' },
  { value: '200+', label: 'Unique Recipes' },
  { value: '50k+', label: 'Happy Customers' },
  { value: '18', label: 'Awards Won' },
];
