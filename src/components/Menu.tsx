import { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Star,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Search,
  ChevronDown,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSiteContent, type Category } from '../context/SiteContentContext';
import type { Dessert, DessertCategory } from '../types';
import toast from 'react-hot-toast';

interface DessertFormState {
  id: number | null;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  badge: string;
  badgeColor: string;
  rating: string;
}

const emptyForm: DessertFormState = {
  id: null,
  name: '',
  description: '',
  price: '',
  category: 'cakes',
  image: '',
  badge: '',
  badgeColor: '',
  rating: '4.5',
};

// Палитра основных цветов для бейджа
const badgeColors = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981',
  '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#ec4899', '#f43f5e', '#78716c', '#374151',
  '#000000', '#ffffff', '#facc15', '#22c55e', '#0ea5e9'
];

function getContrastColor(hex: string): string {
  if (!hex) return '#fff';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? '#1f2937' : '#ffffff';
}

function ColorPicker({ value, onChange }: { value: string; onChange: (color: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentColor = value || '#f43f5e';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 bg-white text-sm font-['Inter'] cursor-pointer hover:border-rose-300 transition-colors"
      >
        <span
          className="w-5 h-5 rounded-full border border-stone-200"
          style={{ backgroundColor: currentColor }}
        />
        <span>Цвет бейджа</span>
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 p-3 bg-white rounded-2xl shadow-xl border border-stone-100 w-64">
          <p className="font-['Inter'] text-xs text-stone-500 mb-2">Выберите цвет (прокрутите)</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {badgeColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  onChange(color);
                  setOpen(false);
                }}
                className="flex-shrink-0 w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: color,
                  borderColor: value === color ? '#f43f5e' : '#e5e7eb',
                }}
                aria-label={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DessertCard({ dessert, index, isAdmin, onEdit, onDelete }: {
  dessert: Dessert;
  index: number;
  isAdmin: boolean;
  onEdit: (dessert: Dessert) => void;
  onDelete: (id: number) => void;
}) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(dessert);
    toast.success(`${dessert.name} добавлен в корзину!`, {
      icon: '🍰',
      style: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        borderRadius: '12px',
        background: '#fff',
        color: '#292524',
        border: '1px solid #fce7f3',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
      },
    });
  };

  const badgeStyle = dessert.badgeColor
    ? { backgroundColor: dessert.badgeColor, color: getContrastColor(dessert.badgeColor) }
    : dessert.badge === 'Новинка'
    ? { backgroundColor: '#10b981', color: '#fff' }
    : dessert.badge === 'Хит продаж'
    ? { backgroundColor: '#f59e0b', color: '#78350f' }
    : { backgroundColor: '#e11d48', color: '#fff' };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-stone-100"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={dessert.image}
          alt={dessert.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {dessert.badge && (
          <span
            className="absolute top-3 left-3 px-3 py-1 text-[11px] font-['Inter'] font-semibold rounded-full uppercase tracking-wide"
            style={badgeStyle}
          >
            {dessert.badge}
          </span>
        )}

        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2 z-20">
            <button
              onClick={() => onEdit(dessert)}
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-stone-600 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer shadow-sm"
              aria-label="Изменить"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(dessert.id)}
              className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-stone-600 hover:text-red-600 hover:bg-white transition-colors cursor-pointer shadow-sm"
              aria-label="Удалить"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}

        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 cursor-pointer"
          aria-label={`Добавить ${dessert.name} в корзину`}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(dessert.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200 fill-stone-200'}
            />
          ))}
          <span className="font-['Inter'] text-xs text-stone-400 ml-1">{dessert.rating}</span>
        </div>

        <span className="text-[10px] font-['Inter'] font-medium text-rose-500 uppercase tracking-widest">
          {dessert.category}
        </span>

        <h3 className="font-['Playfair_Display'] text-lg font-semibold text-stone-900 mt-1 mb-1.5 group-hover:text-rose-700 transition-colors duration-300">
          {dessert.name}
        </h3>
        <p className="font-['Inter'] text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {dessert.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-['Playfair_Display'] text-2xl font-bold text-stone-900">
              ₽{dessert.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white rounded-full font-['Inter'] text-sm font-semibold transition-all duration-300 cursor-pointer group/btn"
          >
            <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

function DessertFormModal({ initial, categories, onSave, onClose }: {
  initial: DessertFormState;
  categories: Category[];
  onSave: (dessert: Dessert) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<DessertFormState>(initial);

  const handleChange = (field: keyof DessertFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim() || !form.price.trim()) {
      toast.error('Заполните название, цену и изображение');
      return;
    }
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Введите корректную цену');
      return;
    }
    const rating = parseFloat(form.rating);
    const dessert: Dessert = {
      id: form.id ?? Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      category: form.category as DessertCategory,
      image: form.image.trim(),
      badge: form.badge.trim() || undefined,
      badgeColor: form.badgeColor || undefined,
      rating: isNaN(rating) ? 0 : rating,
    };
    onSave(dessert);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900 mb-5">
          {form.id ? 'Изменить десерт' : 'Добавить десерт'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Название *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="Например, Торт «Прага»"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Цена (₽) *</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="1200.00"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Категория</label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Рейтинг</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Бейдж (текст)</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => handleChange('badge', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="Хит продаж, Новинка..."
              />
            </div>
            <div>
              <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Цвет бейджа</label>
              <ColorPicker
                value={form.badgeColor}
                onChange={(color) => handleChange('badgeColor', color)}
              />
            </div>
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
            <label className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1">Изображение *</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={form.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 font-['Inter'] text-sm"
                placeholder="https://... или загрузите файл"
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
            {form.image && (
              <img src={form.image} alt="Предпросмотр" className="mt-2 w-32 h-32 object-cover rounded-xl border border-stone-200" />
            )}
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

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingDessert, setEditingDessert] = useState<DessertFormState>(emptyForm);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { ref, inView } = useScrollAnimation();
  const { isAdmin } = useAuth();
  const {
    desserts,
    realDesserts,
    dessertsMode,
    addDessert,
    updateDessert,
    deleteDessert,
    addRealDessert,
    updateRealDessert,
    deleteRealDessert,
    setDessertsMode,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useSiteContent();

  // Активный массив карточек в зависимости от режима
  const activeDesserts = dessertsMode === 'demo' ? desserts : realDesserts;

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? activeDesserts
      : activeDesserts.filter((d) => d.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }
    return result;
  }, [activeDesserts, activeCategory, searchQuery]);

  const openAddForm = () => {
    setEditingDessert({ ...emptyForm, category: categories[0]?.id || 'cakes' });
    setFormOpen(true);
  };

  const openEditForm = (dessert: Dessert) => {
    setEditingDessert({
      id: dessert.id,
      name: dessert.name,
      description: dessert.description,
      price: dessert.price.toString(),
      category: dessert.category,
      image: dessert.image,
      badge: dessert.badge || '',
      badgeColor: dessert.badgeColor || '',
      rating: dessert.rating.toString(),
    });
    setFormOpen(true);
  };

  const handleSaveDessert = (dessert: Dessert) => {
    if (dessertsMode === 'demo') {
      if (editingDessert.id) {
        updateDessert(dessert);
        toast.success('Демо-десерт обновлён');
      } else {
        addDessert(dessert);
        toast.success('Демо-десерт добавлен');
      }
    } else {
      if (editingDessert.id) {
        updateRealDessert(dessert);
        toast.success('Реальный десерт обновлён');
      } else {
        addRealDessert(dessert);
        toast.success('Реальный десерт добавлен');
      }
    }
    setFormOpen(false);
  };

  const handleDeleteDessert = (id: number) => {
    if (window.confirm('Удалить этот десерт?')) {
      if (dessertsMode === 'demo') {
        deleteDessert(id);
      } else {
        deleteRealDessert(id);
      }
      toast.success('Десерт удалён');
    }
  };

  const handleModeToggle = (mode: 'demo' | 'real') => {
    setDessertsMode(mode);
    toast.success(`Режим карточек: ${mode === 'demo' ? 'демо' : 'реальные'}`);
    setActiveCategory('all');
    setSearchQuery('');
    setEditMode(false);
  };

  const handleAddCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, '-');
    addCategory({ id, label: name });
    setNewCategoryName('');
    toast.success('Категория добавлена');
  };

  const handleRenameCategory = (id: string, newLabel: string) => {
    if (newLabel.trim()) {
      updateCategory(id, newLabel.trim());
      toast.success('Категория переименована');
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (id === 'all') {
      toast.error('Нельзя удалить категорию «Все»');
      return;
    }
    if (window.confirm('Удалить категорию? Товары останутся, но потеряют привязку.')) {
      deleteCategory(id);
      toast.success('Категория удалена');
    }
  };

  return (
    <section id="menu" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block font-['Dancing_Script'] text-rose-500 text-2xl mb-3">
            Наше меню
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Создано с любовью
          </h2>
          <p className="font-['Inter'] text-stone-500 max-w-lg mx-auto leading-relaxed">
            Ознакомьтесь с нашей сезонной коллекцией — каждое изделие сделано с любовью и свежее каждый день.
          </p>

          {isAdmin && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {/* Переключатель режима */}
              <div className="flex items-center gap-2">
                <span className="font-['Inter'] text-xs text-stone-500">Режим:</span>
                <button
                  onClick={() => handleModeToggle('demo')}
                  className={`px-4 py-2 rounded-full text-sm font-['Inter'] transition-colors cursor-pointer ${
                    dessertsMode === 'demo'
                      ? 'bg-rose-700 text-white'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-rose-50'
                  }`}
                >
                  Демо
                </button>
                <button
                  onClick={() => handleModeToggle('real')}
                  className={`px-4 py-2 rounded-full text-sm font-['Inter'] transition-colors cursor-pointer ${
                    dessertsMode === 'real'
                      ? 'bg-rose-700 text-white'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-rose-50'
                  }`}
                >
                  Реальные
                </button>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-5 py-2.5 rounded-full font-['Inter'] text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                  editMode
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-rose-300 hover:text-rose-600'
                }`}
              >
                {editMode ? 'Завершить редактирование' : 'Редактировать меню'}
              </button>
              {editMode && (
                <button
                  onClick={openAddForm}
                  className="px-5 py-2.5 bg-rose-700 text-white rounded-full font-['Inter'] text-sm font-semibold hover:bg-rose-800 transition-colors cursor-pointer"
                >
                  Добавить десерт
                </button>
              )}
            </div>
          )}
        </div>

        {/* Поиск */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-stone-200 font-['Inter'] text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
          />
        </div>

        {/* Категории */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-['Inter'] text-sm font-medium transition-all duration-300 cursor-pointer border ${
                activeCategory === cat.id
                  ? 'bg-rose-700 text-white border-rose-700 shadow-md shadow-rose-200'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-rose-300 hover:text-rose-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
          {editMode && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Новая категория"
                className="px-3 py-2 rounded-full border border-stone-200 text-sm w-36"
              />
              <button
                onClick={handleAddCategory}
                className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 cursor-pointer"
                aria-label="Добавить категорию"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Управление категориями (только админ в режиме редактирования) */}
        {editMode && isAdmin && (
          <div className="mb-8 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <h3 className="font-['Inter'] text-sm font-semibold text-stone-700 mb-3">Управление категориями</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-1 bg-white rounded-full px-3 py-1 border border-stone-200">
                  <input
                    type="text"
                    value={cat.label}
                    onChange={(e) => handleRenameCategory(cat.id, e.target.value)}
                    className="w-24 text-sm bg-transparent outline-none"
                  />
                  {cat.id !== 'all' && (
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-stone-400 hover:text-red-500 cursor-pointer"
                      aria-label="Удалить категорию"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Сетка десертов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((dessert, i) => (
            <DessertCard
              key={dessert.id}
              dessert={dessert}
              index={i}
              isAdmin={isAdmin && editMode}
              onEdit={openEditForm}
              onDelete={handleDeleteDessert}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400 font-['Inter'] text-sm mt-10">
            {dessertsMode === 'real'
              ? 'В реальном режиме пока нет тортов. Добавьте первый десерт!'
              : 'Ничего не найдено. Попробуйте изменить запрос.'}
          </p>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="font-['Inter'] text-stone-500 mb-4 text-sm">
            Ищете что-то особенное? Мы создаём индивидуальные заказы для свадеб, дней рождений и мероприятий.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-white rounded-full font-['Inter'] font-semibold text-sm transition-all duration-300 cursor-pointer"
          >
            Заказать индивидуально
          </button>
        </div>
      </div>

      {formOpen && (
        <DessertFormModal
          initial={editingDessert}
          categories={categories}
          onSave={handleSaveDessert}
          onClose={() => setFormOpen(false)}
        />
      )}
    </section>
  );
}
