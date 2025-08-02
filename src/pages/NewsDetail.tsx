import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAppContext();
  const { news } = state;
  
  const newsItem = news.find(item => item.id === id);
  
  if (!newsItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Новость не найдена</h1>
          <Link to="/news" className="text-blue-600 hover:underline">
            Вернуться к новостям
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/news" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft size={20} />
          <span>Назад к новостям</span>
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {newsItem.image && (
          <img 
            src={newsItem.image} 
            alt={newsItem.title}
            className="w-full h-64 object-cover"
          />
        )}
        
        <div className="p-8">
          <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
            <Calendar size={16} />
            <span>{newsItem.date}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {newsItem.title}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {newsItem.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
