export interface Dessert {
  id: number;
  name: string;
  description: string;
  price: number;
  category: DessertCategory;
  image: string;
  badge?: string;
  rating: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export type DessertCategory = 'all' | 'cakes' | 'macarons' | 'pastries' | 'tarts' | 'chocolates';

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  dessert: Dessert;
  quantity: number;
}

export interface NavLink {
  label: string;
  href: string;
}
