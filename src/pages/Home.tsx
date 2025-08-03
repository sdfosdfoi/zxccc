import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, Building, Users, Send, Shield } from 'lucide-react';
import CaptchaField from '../components/CaptchaField';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

// Отправка email через backend API
const sendEmail = async (content: string) => {
  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'jojez10c@gmail.com',
        subject: 'Новое обращение с портала',
        text: `Описание нарушения:\n\n${content}\n\nВремя отправки: ${new Date().toLocaleString()}`
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Ошибка отправки email');
    }
    
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
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
      .then(() => alert('Сообщение отправлено! Спасибо за вашу активную гражданскую позицию.'))
      .catch((error) => {
        console.error('Email error:', error);
        alert('Сообщение сохранено в системе. Администратор получит уведомление.');
      });
    
    setFormData({ description: '', captcha: '' });
    setIsCaptchaValid(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Slider */}
          <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-lg mb-6 border-t-4 border-blue-600">
            <div className="px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center text-center">
                <Shield className="w-6 h-6 text-blue-700 mr-3" />
                Общественный налоговый и земельный контроль
              </h2>
              <div className="mt-5 min-h-[140px] flex items-center justify-center bg-white shadow-md border border-gray-200 p-6">
                <div className="text-center w-full">
                  {currentSlide === 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {siteTexts.sliderText1Title}
                      </h3>
                      <p className="text-base text-gray-700">
                        {siteTexts.sliderText1Content}
                      </p>
                    </div>
                  )}
                  {currentSlide === 1 && (
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {siteTexts.sliderText2Title}
                      </h3>
                      <p className="text-base text-gray-700">
                        {siteTexts.sliderText2Content}
                      </p>
                    </div>
                  )}
                  {currentSlide === 2 && (
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {siteTexts.sliderText3Title}
                      </h3>
                      <p className="text-base text-gray-700">
                        {siteTexts.sliderText3Content}
                      </p>
                    </div>
                  )}
                  {currentSlide === 3 && (
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {siteTexts.sliderText4Title}
                      </h3>
                      <p className="text-base text-gray-700">
                        {siteTexts.sliderText4Content}
                      </p>
                    </div>
                  )}
                  {currentSlide === 4 && (
                    <div>
                      <h3 className="text-xl font-bold text-blue-800 mb-2">
                        {siteTexts.sliderText5Title}
                      </h3>
                      <p className="text-base text-gray-700">
                        {siteTexts.sliderText5Content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button onClick={prevSlide} className="px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 rounded">
                  ← Назад
                </button>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentSlide ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                <button onClick={nextSlide} className="px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 rounded">
                  Вперед →
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
