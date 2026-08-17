import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Cart() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    toast.success('Спасибо за ваш заказ! Мы скоро свяжемся с вами для подтверждения.', {
      icon: '🎉',
      duration: 4000,
      style: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        borderRadius: '12px',
        background: '#fff',
        color: '#292524',
        border: '1px solid #fce7f3',
      },
    });
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white shadow-2xl flex flex-col transition-transform duration-400 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Корзина покупок"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-rose-600" />
            <h2 className="font-['Playfair_Display'] text-lg font-semibold text-stone-900">
              Ваша корзина
            </h2>
            {totalItems > 0 && (
              <span className="px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-full font-['Inter'] text-xs font-semibold">
                {totalItems} {totalItems === 1 ? 'товар' : totalItems >= 2 && totalItems <= 4 ? 'товара' : 'товаров'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors duration-200 cursor-pointer"
            aria-label="Закрыть корзину"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-rose-300" />
              </div>
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-stone-700 mb-2">
                Ваша корзина пуста
              </h3>
              <p className="font-['Inter'] text-stone-400 text-sm max-w-[200px]">
                Добавьте вкусные десерты, чтобы начать!
              </p>
              <button
                onClick={() => {
                  closeCart();
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-rose-700 text-white rounded-full font-['Inter'] text-sm font-semibold hover:bg-rose-800 transition-colors cursor-pointer"
              >
                Перейти в меню
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.dessert.id}
                  className="flex gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-100 hover:border-rose-100 transition-colors duration-200"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.dessert.image}
                      alt={item.dessert.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-['Playfair_Display'] text-sm font-semibold text-stone-800 truncate">
                      {item.dessert.name}
                    </h4>
                    <p className="font-['Inter'] text-rose-600 text-sm font-semibold mt-0.5">
                      ₽{item.dessert.price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.dessert.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-all duration-200 cursor-pointer"
                        aria-label={`Уменьшить количество ${item.dessert.name}`}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-['Inter'] text-sm font-semibold text-stone-800 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.dessert.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-all duration-200 cursor-pointer"
                        aria-label={`Увеличить количество ${item.dessert.name}`}
                      >
                        <Plus size={10} />
                      </button>

                      <span className="font-['Inter'] text-xs text-stone-400 ml-auto">
                        ₽{(item.dessert.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.dessert.id)}
                    className="p-1.5 text-stone-300 hover:text-red-400 transition-colors duration-200 flex-shrink-0 self-start cursor-pointer"
                    aria-label={`Удалить ${item.dessert.name} из корзины`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-stone-500 text-sm">Сумма заказа</span>
              <span className="font-['Inter'] text-stone-800 text-sm font-medium">
                ₽{totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-stone-500 text-sm">Доставка</span>
              <span className="font-['Inter'] text-emerald-600 text-sm font-medium">
                {totalPrice >= 30 ? 'Бесплатно' : '₽4.95'}
              </span>
            </div>
            {totalPrice < 30 && (
              <p className="font-['Inter'] text-xs text-stone-400 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                Добавьте ₽{(30 - totalPrice).toFixed(2)} для бесплатной доставки 🎁
              </p>
            )}
            <div className="flex items-center justify-between border-t border-stone-100 pt-4">
              <span className="font-['Playfair_Display'] text-stone-900 font-semibold">Итого</span>
              <span className="font-['Playfair_Display'] text-rose-700 text-xl font-bold">
                ₽{(totalPrice + (totalPrice >= 30 ? 0 : 4.95)).toFixed(2)}
              </span>
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-['Inter'] font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Оформить заказ
              <ArrowRight size={16} />
            </button>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="w-full py-2 text-stone-400 hover:text-red-500 font-['Inter'] text-xs transition-colors duration-200 cursor-pointer"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </div>
    </>
  );
}
