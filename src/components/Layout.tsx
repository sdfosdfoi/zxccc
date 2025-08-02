import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import { useAdminPanel } from '../hooks/useAdminPanel';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAdminOpen, closeAdmin } = useAdminPanel();
  const location = useLocation();
  const { state } = useAppContext();
  const { logoPath, siteTexts } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="Логотип" 
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  // Fallback к старому логотипу если новый не загружается
                  (e.target as HTMLImageElement).src = 'https://iimg.su/i/zqNOrE';
                }}
              />
              <div>
                <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                  Общественный налоговый и земельный контроль
                </Link>
                <p className="text-sm text-gray-600">
                  Все граждане России обязаны платить налоги
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 py-3">
            <li>
              <Link 
                to="/" 
                className={`hover:text-blue-200 transition-colors ${
                  location.pathname === '/' ? 'text-blue-200 font-medium' : ''
                }`}
              >
Главная
              </Link>
            </li>
            <li>
              <Link 
                to="/news" 
                className={`hover:text-blue-200 transition-colors ${
                  location.pathname === '/news' ? 'text-blue-200 font-medium' : ''
                }`}
              >
                Новости
              </Link>
            </li>
            <li>
              <Link 
                to="/documents" 
                className={`hover:text-blue-200 transition-colors ${
                  location.pathname === '/documents' ? 'text-blue-200 font-medium' : ''
                }`}
              >
                Нормативные документы
              </Link>
            </li>
            <li>
              <Link 
                to="/authorities" 
                className={`hover:text-blue-200 transition-colors ${
                  location.pathname === '/authorities' ? 'text-blue-200 font-medium' : ''
                }`}
              >
                Контролирующие органы
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      {children}

      {/* Admin Panel */}
      <AdminPanel isOpen={isAdminOpen} onClose={closeAdmin} />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <p className="text-gray-300">
              Мы используем данные из открытых источников и не применяем личные данные владельцев имущества. 
              Наша цель – бесплатно информировать собственников имущества о возможных нарушениях законодательства. 
              Также мы информируем госорганы о возможных нарушениях.
            </p>
            <p className="text-gray-400 text-sm">
              Если сведения, взятые из открытых источников, недостоверны, пожалуйста, сообщите об этом, и мы примем меры.
            </p>
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-sm">
                © 2025 Общественный налоговый и земельный контроль. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
