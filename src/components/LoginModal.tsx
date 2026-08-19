import { useState } from 'react';
import { X, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { loginAsAdmin, loginAsUser } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleAdminLogin = () => {
    if (loginAsAdmin(password)) {
      toast.success('Вы вошли как администратор', { icon: '🔐' });
      onClose();
      setPassword('');
      setError('');
    } else {
      setError('Неверный пароль. Попробуйте admin123');
    }
  };

  const handleUserLogin = () => {
    loginAsUser();
    toast.success('Вы вошли как пользователь', { icon: '👤' });
    onClose();
    setPassword('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-3">
            <User size={26} className="text-rose-600" />
          </div>
          <h2 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900">Вход</h2>
          <p className="font-['Inter'] text-sm text-stone-500 mt-1">
            Выберите режим для тестирования сайта
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="adminPassword" className="block font-['Inter'] text-xs font-semibold text-stone-600 uppercase tracking-widest mb-1.5">
              Пароль администратора
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                id="adminPassword"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Введите пароль"
                className={`w-full pl-9 pr-4 py-3 rounded-xl border font-['Inter'] text-sm text-stone-800 placeholder-stone-300 bg-stone-50 focus:bg-white transition-all duration-200 outline-none focus:ring-2 ${
                  error ? 'border-red-300 focus:ring-red-100' : 'border-stone-200 focus:border-rose-400 focus:ring-rose-100'
                }`}
              />
            </div>
            {error && (
              <p className="font-['Inter'] text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="font-['Inter'] text-xs text-amber-700">
              <strong>Подсказка для тестирования:</strong><br />
              Пароль администратора: <code className="font-mono">admin123</code><br />
              Для режима пользователя нажмите кнопку ниже.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAdminLogin}
              className="py-3 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-['Inter'] font-semibold text-sm transition-colors cursor-pointer shadow-sm"
            >
              Войти как админ
            </button>
            <button
              onClick={handleUserLogin}
              className="py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-['Inter'] font-semibold text-sm transition-colors cursor-pointer"
            >
              Как пользователь
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}