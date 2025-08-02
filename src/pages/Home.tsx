import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Building, Users, Send, Shield } from 'lucide-react';
import CaptchaField from '../components/CaptchaField';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    description: '',
    captcha: ''
  });
  const { state, addReport } = useAppContext();
  const { news, sliderItems, siteTexts } = state;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Добавляем обращение в контекст, оно попадет в админ-панель
    addReport({ content: formData.description });
    alert('Сообщение отправлено! Спасибо за вашу активную гражданскую позицию.');
    setFormData({ description: '', captcha: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Slider */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {sliderItems.length > 0 && (
              <div className="relative">
                <div className="w-full max-h-80 bg-gray-100 rounded-lg overflow-hidden relative flex items-center justify-center pt-16">
                  <img 
                    src={sliderItems[currentSlide]?.imagePath || '/image.png'} 
                    alt={sliderItems[currentSlide]?.caption || ''}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/image.png';
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={prevSlide}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <ChevronLeft size={20} />
                    <span>Назад</span>
                  </button>
                  <div className="flex space-x-2">
                    {sliderItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${
                          index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={nextSlide}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <span>Далее</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Putin Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <img 
                src="https://avatars.mds.yandex.net/get-entity_search/5535095/1174712080/S600xU_2x" 
                alt="Путин В.В." 
                className="w-32 h-40 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Позиция главы государства</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    По мнению главы государства, налоговая система должна обеспечивать поступление ресурсов для решения общенациональных задач, а также для реализации региональных программ. Она призвана сокращать неравенство, причём не только в обществе, но и в социально-экономическом развитии регионов, учитывать уровень доходов граждан и компаний.
                  </p>
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic">
                    «При этом нужно, безусловно, закрыть всяческие лазейки, которые используются некоторыми компаниями для ухода от налогов или занижения своих налоговых платежей»
                  </blockquote>
                  <p className="text-sm text-gray-600">
                    — Путин В.В. 
                    <a href="https://rg.ru/2024/02/29/putin-predlozhil-sdelat-nalogovuiu-sistemu-bolee-spravedlivoj.html" 
                       className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                      Источник
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <blockquote className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <p className="italic text-gray-700">«Налоговая политика должна быть не только эффективной, но и справедливой»</p>
                <cite className="text-sm text-gray-600">— Владимир Путин</cite>
              </blockquote>
              
              <blockquote className="bg-red-50 p-4 rounded border-l-4 border-red-500">
                <p className="italic text-gray-700">«Коррупция — это недополучение государственных доходов, в том числе налоговых»</p>
                <cite className="text-sm text-gray-600">— Владимир Путин</cite>
              </blockquote>
              
              <blockquote className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                <p className="italic text-gray-700">«Все хитрят. Надо просто найти оптимальный вариант и для того, чтобы и потребитель получал выгоду, и чтобы государство только не страдало, а отрасль развивалась»</p>
                <cite className="text-sm text-gray-600">
                  — Владимир Путин 
                  <a href="https://www.business-gazeta.ru/news/672061" 
                     className="text-blue-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                    Источник
                  </a>
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Report Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2 text-blue-600" />
              Форма проверки объекта
            </h3>
            <p className="text-gray-600 mb-6">
              Сообщите о нарушениях, которые, на ваш взгляд, имеют место. 
              Мы не собираем данные о пользователях. Если вы считаете, что нарушается законодательство, сообщите анонимно. Наши специалисты проверят информацию, и если она подтвердится, направим данные в госорганы.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Описание нарушения
                </label>
                <textarea
                  id="description"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Опишите подробно выявленное нарушение..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <CaptchaField
                  value={formData.captcha}
                  onChange={(value) => setFormData({...formData, captcha: value})}
                  isValid={true}
                />
              </div>
              
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
                <span>Отправить</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* News Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="mr-2 text-blue-600" />
              Новости
            </h3>
            <div className="space-y-4">
              {news.length > 0 ? (
                news.slice(0, 3).map((item) => (
                  <div key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                    <p className="text-sm text-gray-600">{item.preview}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Новостей пока нет</p>
                </div>
              )}
            </div>
            <Link to="/news" className="inline-block mt-4 text-blue-600 hover:underline text-sm">
              Все новости →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
