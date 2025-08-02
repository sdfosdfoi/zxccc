import React from 'react';
import { Calendar, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const News: React.FC = () => {
  const { state } = useAppContext();
  const { news } = state;

  const publishedNews = news.filter(item => item.isPublished);
  const allNews = publishedNews;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft size={20} />
          <span>Назад на главную</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <FileText className="mr-3 text-blue-600" />
        Новости
      </h1>

      {allNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allNews.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 text-sm mb-3">
                  <Calendar size={16} />
                  <span>{item.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.content || item.preview}
                </p>
                <Link to={`/news/${item.id}`} className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium inline-block">
                  Читать далее →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Новостей пока нет</p>
        </div>
      )}

      {allNews.length > 6 && (
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Загрузить еще новости
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
