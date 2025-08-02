import React from 'react';
import { Building, ExternalLink, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Authorities: React.FC = () => {
  const authorities = [
    {
      id: 1,
      name: "Федеральная налоговая служба России",
      shortName: "ФНС России",
      description: "Контроль за соблюдением налогового законодательства, правильностью исчисления, полнотой и своевременностью уплаты налогов",
      website: "https://nalog.gov.ru",
      phone: "8-800-222-22-22",
      email: "info@nalog.ru",
      address: "г. Москва, ул. Неглинная, д. 23",
      functions: [
        "Налоговый контроль",
        "Камеральные и выездные проверки",
        "Взыскание недоимок",
        "Регистрация налогоплательщиков"
      ]
    },
    {
      id: 2,
      name: "Федеральная служба государственной регистрации, кадастра и картографии",
      shortName: "Росреестр",
      description: "Государственная регистрация прав на недвижимое имущество, ведение государственного кадастра недвижимости",
      website: "https://rosreestr.gov.ru",
      phone: "8-800-100-34-34",
      email: "info@rosreestr.ru",
      address: "г. Москва, ул. Мясницкая, д. 39",
      functions: [
        "Государственная регистрация прав",
        "Ведение кадастра недвижимости",
        "Кадастровая оценка",
        "Государственный земельный надзор"
      ]
    },
    {
      id: 3,
      name: "Федеральная служба по надзору в сфере природопользования",
      shortName: "Росприроднадзор",
      description: "Контроль и надзор в сфере природопользования, охраны окружающей среды",
      website: "https://rpn.gov.ru",
      phone: "8-800-100-94-00",
      email: "info@rpn.gov.ru",
      address: "г. Москва, ул. Большая Грузинская, д. 4/6",
      functions: [
        "Экологический контроль",
        "Контроль использования земель",
        "Надзор за соблюдением земельного законодательства",
        "Выдача разрешений на природопользование"
      ]
    },
    {
      id: 4,
      name: "Федеральная служба государственного строительного надзора",
      shortName: "Госстройнадзор",
      description: "Контроль и надзор в области градостроительной деятельности",
      website: "https://gosstroynadzor.gov.ru",
      phone: "8-495-625-35-50",
      email: "info@gosstroynadzor.ru",
      address: "г. Москва, Садовая-Самотечная ул., д. 10/14",
      functions: [
        "Строительный надзор",
        "Контроль соблюдения градостроительного законодательства",
        "Выдача разрешений на строительство",
        "Контроль самовольного строительства"
      ]
    },
    {
      id: 5,
      name: "Прокуратура Российской Федерации",
      shortName: "Генпрокуратура РФ",
      description: "Надзор за соблюдением Конституции РФ и исполнением законов",
      website: "https://genproc.gov.ru",
      phone: "8-495-987-56-56",
      email: "info@genproc.gov.ru",
      address: "г. Москва, ул. Большая Дмитровка, д. 15а",
      functions: [
        "Прокурорский надзор",
        "Надзор за исполнением законов",
        "Координация правоохранительной деятельности",
        "Участие в рассмотрении дел судами"
      ]
    },
    {
      id: 6,
      name: "Министерство внутренних дел России",
      shortName: "МВД России",
      description: "Обеспечение безопасности личности, общества и государства",
      website: "https://mvd.gov.ru",
      phone: "8-495-667-74-47",
      email: "info@mvd.ru",
      address: "г. Москва, ул. Житная, д. 16",
      functions: [
        "Охрана общественного порядка",
        "Борьба с преступностью",
        "Административный надзор",
        "Миграционный учет"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={20} />
            <span>Назад на главную</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Контролирующие органы</h1>
        <p className="text-gray-600 mb-8">
          Список органов государственной власти, осуществляющих контроль в сфере налогообложения и земельных отношений
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {authorities.map((authority) => (
            <div key={authority.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {authority.shortName}
                  </h2>
                  <h3 className="text-sm text-gray-600 mb-3">
                    {authority.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {authority.description}
                  </p>

                  {/* Functions */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Основные функции:</h4>
                    <ul className="space-y-1">
                      {authority.functions.map((func, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                          {func}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone size={16} />
                      <span>{authority.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail size={16} />
                      <span>{authority.email}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Адрес:</strong> {authority.address}
                    </div>
                  </div>

                  {/* Website Link */}
                  <a
                    href={authority.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ExternalLink size={16} />
                    <span>Перейти на сайт</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Важная информация</h3>
          <div className="space-y-2 text-gray-700">
            <p>• Все контактные данные актуальны на момент публикации</p>
            <p>• Для получения консультаций обращайтесь по указанным телефонам</p>
            <p>• Официальные сайты содержат подробную информацию о деятельности органов</p>
            <p>• При обращении в органы власти ссылайтесь на конкретные нормы законодательства</p>
          </div>
        </div>

        {/* Regional Offices Note */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Региональные подразделения</h3>
          <p className="text-gray-700">
            Каждый из перечисленных органов имеет территориальные подразделения в субъектах Российской Федерации. 
            Для решения конкретных вопросов рекомендуется обращаться в соответствующие региональные управления.
          </p>
        </div>
    </div>
  );
};

export default Authorities;
