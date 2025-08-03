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
            <div className="flex items-center space-x-2 sm:space-x-4">
              <img 
                src={logoPath} 
                alt="Логотип" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain flex-shrink-0"
                onError={(e) => {
                  // Fallback к старому логотипу если новый не загружается
                  (e.target as HTMLImageElement).src = 'https://iimg.su/i/zqNOrE';
                }}
              />
              <div className="min-w-0">
                <Link to="/" className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors block leading-tight">
                  <span className="hidden sm:inline">Общественный налоговый и земельный контроль</span>
                  <span className="sm:hidden">Налоговый контроль</span>
                </Link>
                <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                  <span className="hidden sm:inline">Все граждане России обязаны платить налоги</span>
                  <span className="sm:hidden">Контроль налогообложения</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 py-3 text-sm sm:text-base">
            <li>
              <Link 
                to="/" 
                className={`hover:text-blue-200 transition-colors whitespace-nowrap ${
                  location.pathname === '/' ? 'text-blue-200 font-medium' : ''
                }`}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                to="/news" 
                className={`hover:text-blue-200 transition-colors whitespace-nowrap ${
                  location.pathname === '/news' ? 'text-blue-200 font-medium' : ''
                }`}
              >
                Новости
              </Link>
            </li>
            <li>
              <Link 
                to="/documents" 
                className={`hover:text-blue-200 transition-colors whitespace-nowrap ${
                  location.pathname === '/documents' ? 'text-blue-200 font-medium' : ''
                }`}
              >
                <span className="hidden sm:inline">Нормативные документы</span>
                <span className="sm:hidden">Документы</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/authorities" 
                className={`hover:text-blue-200 transition-colors whitespace-nowrap ${
                  location.pathname === '/authorities' ? 'text-blue-200 font-medium' : ''
                }`}
              >
                <span className="hidden sm:inline">Контролирующие органы</span>
                <span className="sm:hidden">Органы</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contact Notice */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base font-medium">
            📧 Если интересует еще продолжение или покупка этого сайта напишите на почту: 
            <a href="mailto:jojez10c@gmail.com" className="underline hover:text-red-200 ml-1">
              jojez10c@gmail.com
            </a>
          </p>
        </div>
      </div>

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
