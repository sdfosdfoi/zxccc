import React from 'react';
import { FileText, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Documents: React.FC = () => {
  const { state } = useAppContext();
  const { documents } = state;

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={20} />
            <span>Назад на главную</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Нормативные документы</h1>
        <p className="text-gray-600 mb-8">
          В этом разделе представлены ключевые нормативные документы, касающиеся налогообложения и земельного
          законодательства.
        </p>

        {documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {doc.title || doc.name}
                    </h2>
                    {doc.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {doc.description}
                      </p>
                    )}
                    {doc.category && (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-3">
                        {doc.category}
                      </span>
                    )}

                    <a
                      href={doc.url || doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Download size={16} />
                      <span>Скачать PDF</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Документов пока нет</p>
          </div>
        )}

        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Важная информация</h3>
          <div className="space-y-2 text-gray-700">
            <p>• Все документы актуальны на момент публикации</p>
            <p>• Для полной версии документов обратитесь на официальные сайты</p>
            <p>• Последние изменения законодательства могут не быть отражены в документах</p>
          </div>
        </div>
    </div>
  );
};

export default Documents;
