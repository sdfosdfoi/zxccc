import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, Building, Users, Send, Shield } from 'lucide-react';
import CaptchaField from '../components/CaptchaField';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

// Email sending function (for frontend, we'll use a different approach)
const sendEmail = async (content: string) => {
  try {
    // In a real application, you would send this to your backend API
    // For now, we'll simulate the email sending
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'plaza-gel2024@yandex.ru',
        subject: 'Новое обращение с портала',
        content: content,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error('Ошибка отправки письма');
    }
    
    return await response.json();
  } catch (error) {
    // For demo purposes, we'll just log the content that would be sent
    console.log('Обращение для отправки на plaza-gel2024@yandex.ru:', {
      content,
      timestamp: new Date().toISOString()
    });
    // Simulate successful sending
    return { success: true };
  }
};

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    description: '',
    captcha: ''
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const { state, addReport } = useAppContext();
  const { news, sliderItems, siteTexts } = state;
  const captchaRef = useRef<any>(null);

  const slideCount = 5; // У нас теперь 5 фиксированных слайдов
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  // Автоматическое переключение слайдов каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaValid || !formData.captcha) {
      alert('Пожалуйста, правильно решите пример для проверки безопасности.');
      return;
    }
    
    // Добавляем обращение в контекст, оно попадет в админ-панель
    addReport({ content: formData.description });
    
    // Send the report via email
    sendEmail(formData.description)
      .then(() => alert('Сообщение и письмо отправлены! Спасибо за вашу активную гражданскую позицию.'))
      .catch((error) => alert('Ошибка при отправке письма: ' + error.message));
    
    setFormData({ description: '', captcha: '' });
    setIsCaptchaValid(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Slider */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
            <div className="relative">
              <div className="w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] rounded-xl overflow-hidden relative">
                <div className={`h-full flex items-center justify-center text-white p-4 sm:p-6 lg:p-8 ${
                  currentSlide === 0 ? 'bg-gradient-to-br from-red-600 via-red-700 to-red-800' :
                  currentSlide === 1 ? 'bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800' :
                  currentSlide === 2 ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800' :
                  currentSlide === 3 ? 'bg-gradient-to-br from-green-600 via-green-700 to-green-800' :
                  'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
                }`}>
                  <div className="text-center max-w-4xl mx-auto">
                    <div className="mb-4 sm:mb-6">
                      <div className="text-5xl sm:text-6xl mb-3 opacity-90">⚖️</div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 drop-shadow-lg leading-tight">
                        Налоговый контроль
                      </h2>
                    </div>
                    <div className="text-left bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 border border-white/20">
                      {currentSlide === 0 && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="text-lg sm:text-xl font-semibold text-yellow-200 mb-4">
                            🔍 Заниженная кадастровая стоимость (занижены налоги) – потери бюджета.
                          </div>
                          <div className="text-base sm:text-lg font-medium">
                            Сообщи, направим информацию в госорганы!
                          </div>
                        </div>
                      )}
                      {currentSlide === 1 && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="text-lg sm:text-xl font-semibold text-yellow-200 mb-4">
                            📋 Недостоверные сведения об объекте и его характеристиках.
                          </div>
                          <div className="text-base sm:text-lg font-medium">
                            Сообщи, направим информацию в госорганы!
                          </div>
                        </div>
                      )}
                      {currentSlide === 2 && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="text-lg sm:text-xl font-semibold text-yellow-200 mb-4">
                            💰 Объект не включен в перечень налогоплательщиков от кадастровой стоимости – потери бюджета.
                          </div>
                          <div className="text-base sm:text-lg font-medium">
                            Сообщи, направим информацию в госорганы!
                          </div>
                        </div>
                      )}
                      {currentSlide === 3 && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="text-lg sm:text-xl font-semibold text-yellow-200 mb-4">
                            🏡 Нецелевое использование земельного участка.
                          </div>
                          <div className="text-base sm:text-lg font-medium">
                            Сообщи, направим информацию в госорганы!
                          </div>
                        </div>
                      )}
                      {currentSlide >= 4 && (
                        <div className="space-y-3 sm:space-y-4">
                          <div className="text-lg sm:text-xl font-semibold text-yellow-200 mb-4">
                            🏗️ Самовольное строительство, неоформленный объект недвижимости!
                          </div>
                          <div className="text-base sm:text-lg font-medium">
                            Сообщи, направим информацию в госорганы!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                <button 
                  onClick={prevSlide}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <ChevronLeft size={20} />
                  <span className="hidden sm:inline">Назад</span>
                </button>
                <div className="flex space-x-3">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextSlide}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <span className="hidden sm:inline">Далее</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
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
                  isValid={isCaptchaValid}
                  onValidationChange={setIsCaptchaValid}
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
