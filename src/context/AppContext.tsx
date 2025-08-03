import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for all app data
interface Report {
  id: string;
  content: string;
  status: 'pending' | 'reviewed' | 'forwarded';
  date: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  preview: string; // Add preview field
  date: string;
  isPublished: boolean; // Ensure this is always defined
  image?: string; // Add image property for news
}

interface DocumentItem {
  id: string;
  name: string;
  title?: string;
  link: string;
  url?: string;
  description?: string;
  category?: string;
  date?: string;
}

interface Authority {
  id: string;
  name: string;
  shortName?: string;
  contact: string;
  phone?: string;
  email?: string;
  description?: string;
  website?: string;
  address?: string;
  functions?: string[];
}

interface SliderItem {
  id: string;
  imagePath: string;
  caption: string;
}

interface SiteTexts {
  // Header texts
  siteName: string;
  headerSlogan: string;
  
  // Navigation
  navHome: string;
  navNews: string;
  navAbout: string;
  navContacts: string;
  navAdmin: string;
  
  // Text Slider Content
  sliderTitle: string;
  sliderDescription: string;
  sliderButtonPrev: string;
  sliderButtonNext: string;
  
  // Slider Text Content
  sliderText1Title: string;
  sliderText1Content: string;
  sliderText2Title: string;
  sliderText2Content: string;
  sliderText3Title: string;
  sliderText3Content: string;
  sliderText4Title: string;
  sliderText4Content: string;
  sliderText5Title: string;
  sliderText5Content: string;
  
  // Putin Quotes Section
  putinName: string;
  putinPosition: string;
  putinMainQuote: string;
  putinQuote1: string;
  putinQuote2: string;
  putinQuote3: string;
  putinQuote4: string;
  sourceText: string;
  
  // Object Check Form
  checkFormTitle: string;
  checkFormDescription: string;
  checkFormSubmit: string;
  
  // Home page texts
  homeTitle: string;
  homeSubtitle: string;
  homeDescription: string;
  complaintsFormTitle: string;
  complaintsFormDescription: string;
  complaintsFormSubmit: string;
  
  // Form fields
  formFieldName: string;
  formFieldEmail: string;
  formFieldPhone: string;
  formFieldSubject: string;
  formFieldMessage: string;
  formFieldCaptcha: string;
  
  // Sections
  newsSection: string;
  documentsSection: string;
  authoritiesSection: string;
  
  // Buttons
  btnReadMore: string;
  btnBack: string;
  btnNext: string;
  btnSave: string;
  btnCancel: string;
  btnEdit: string;
  btnDelete: string;
  btnAdd: string;
  
  // Footer
  footerText: string;
  footerContacts: string;
  footerWorkingHours: string;
  
  // Messages
  successMessage: string;
  errorMessage: string;
  loadingText: string;
  noDataText: string;
}

interface AppState {
  reports: Report[];
  news: NewsItem[];
  documents: DocumentItem[];
  authorities: Authority[];
  sliderItems: SliderItem[];
  logoPath: string;
  siteTexts: SiteTexts;
}

interface AppContextProps {
  state: AppState;
  // Report methods
  addReport: (report: Omit<Report, 'id' | 'date'>) => void;
  updateReportStatus: (id: string, status: Report['status']) => void;
  deleteReport: (id: string) => void;
  publishReportAsNews: (reportId: string) => void;
  // News methods
  addNews: (news: Omit<NewsItem, 'id' | 'date'>) => void;
  updateNews: (news: NewsItem) => void;
  deleteNews: (id: string) => void;
  // Document methods
  addDocument: (document: Omit<DocumentItem, 'id'>) => void;
  updateDocument: (document: DocumentItem) => void;
  deleteDocument: (id: string) => void;
  // Authority methods
  addAuthority: (authority: Omit<Authority, 'id'>) => void;
  updateAuthority: (authority: Authority) => void;
  deleteAuthority: (id: string) => void;
  // Slider methods
  addSliderItem: (item: Omit<SliderItem, 'id'>) => void;
  updateSliderItem: (item: SliderItem) => void;
  deleteSliderItem: (id: string) => void;
  // Logo method
  updateLogo: (path: string) => void;
  // Site texts method
  updateSiteTexts: (texts: Partial<SiteTexts>) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Функции для работы с localStorage
const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    reports: loadFromStorage('reports', []),
    news: loadFromStorage('news', []),
    documents: loadFromStorage('documents', []),
    authorities: [
      {
        id: '1',
        name: "Федеральная налоговая служба России",
        shortName: "ФНС России",
        description: "Контроль за соблюдением налогового законодательства, правильностью исчисления, полнотой и своевременностью уплаты налогов",
        website: "https://nalog.gov.ru",
        phone: "8-800-222-22-22",
        email: "info@nalog.ru",
        contact: "8-800-222-22-22",
        address: "г. Москва, ул. Неглинная, д. 23",
        functions: [
          "Налоговый контроль",
          "Камеральные и выездные проверки",
          "Взыскание недоимок",
          "Регистрация налогоплательщиков"
        ]
      },
      {
        id: '2',
        name: "Федеральная служба государственной регистрации, кадастра и картографии",
        shortName: "Росреестр",
        description: "Государственная регистрация прав на недвижимое имущество, ведение государственного кадастра недвижимости",
        website: "https://rosreestr.gov.ru",
        phone: "8-800-100-34-34",
        email: "info@rosreestr.ru",
        contact: "8-800-100-34-34",
        address: "г. Москва, ул. Мясницкая, д. 39",
        functions: [
          "Государственная регистрация прав",
          "Ведение кадастра недвижимости",
          "Кадастровая оценка",
          "Государственный земельный надзор"
        ]
      },
      {
        id: '3',
        name: "Федеральная служба по надзору в сфере природопользования",
        shortName: "Росприроднадзор",
        description: "Контроль и надзор в сфере природопользования, охраны окружающей среды",
        website: "https://rpn.gov.ru",
        phone: "8-800-100-94-00",
        email: "info@rpn.gov.ru",
        contact: "8-800-100-94-00",
        address: "г. Москва, ул. Большая Грузинская, д. 4/6",
        functions: [
          "Экологический контроль",
          "Контроль использования земель",
          "Надзор за соблюдением земельного законодательства",
          "Выдача разрешений на природопользование"
        ]
      },
      {
        id: '4',
        name: "Федеральная служба государственного строительного надзора",
        shortName: "Госстройнадзор",
        description: "Контроль и надзор в области градостроительной деятельности",
        website: "https://gosstroynadzor.gov.ru",
        phone: "8-495-625-35-50",
        email: "info@gosstroynadzor.ru",
        contact: "8-495-625-35-50",
        address: "г. Москва, Садовая-Самотечная ул., д. 10/14",
        functions: [
          "Строительный надзор",
          "Контроль соблюдения градостроительного законодательства",
          "Выдача разрешений на строительство",
          "Контроль самовольного строительства"
        ]
      },
      {
        id: '5',
        name: "Прокуратура Российской Федерации",
        shortName: "Генпрокуратура РФ",
        description: "Надзор за соблюдением Конституции РФ и исполнением законов",
        website: "https://genproc.gov.ru",
        phone: "8-495-987-56-56",
        email: "info@genproc.gov.ru",
        contact: "8-495-987-56-56",
        address: "г. Москва, ул. Большая Дмитровка, д. 15а",
        functions: [
          "Прокурорский надзор",
          "Надзор за исполнением законов",
          "Координация правоохранительной деятельности",
          "Участие в рассмотрении дел судами"
        ]
      },
      {
        id: '6',
        name: "Министерство внутренних дел России",
        shortName: "МВД России",
        description: "Обеспечение безопасности личности, общества и государства",
        website: "https://mvd.gov.ru",
        phone: "8-495-667-74-47",
        email: "info@mvd.ru",
        contact: "8-495-667-74-47",
        address: "г. Москва, ул. Житная, д. 16",
        functions: [
          "Охрана общественного порядка",
          "Борьба с преступностью",
          "Административный надзор",
          "Миграционный учет"
        ]
      }
    ],
    sliderItems: [
      { id: '1', imagePath: '/namber1.png', caption: 'Слайд 1' },
      { id: '2', imagePath: '/namber2.png', caption: 'Слайд 2' },
      { id: '3', imagePath: '/namber3.png', caption: 'Слайд 3' },
      { id: '4', imagePath: '/namber4.png', caption: 'Слайд 4' },
      { id: '5', imagePath: '/namber5.png', caption: 'Слайд 5' }
    ],
  logoPath: '/zxczxc.jpg',
    siteTexts: {
      // Header texts
      siteName: 'Портал обращений граждан',
      headerSlogan: 'Ваш голос важен для нас',
      
      // Navigation
      navHome: 'Главная',
      navNews: 'Новости',
      navAbout: 'О нас',
      navContacts: 'Контакты',
      navAdmin: 'Админ',
      
      // Text Slider Content
      sliderTitle: 'Актуальные проблемы',
      sliderDescription: 'Заниженная кадастровая стоимость (заниженные налоги) — это потери бюджета. Сообщите нам, и мы направим информацию в государственные органы!',
      sliderButtonPrev: 'Назад',
      sliderButtonNext: 'Далее',
      
      // Slider Text Content
      sliderText1Title: 'Заниженная кадастровая стоимость (занижены налоги) – потери бюджета',
      sliderText1Content: 'Сообщи, направим информацию в госорганы!',
      sliderText2Title: 'Недостоверные сведения об объекте и его характеристиках.',
      sliderText2Content: 'Сообщи, направим информацию в госорганы!',
      sliderText3Title: 'Объект не включен в перечень налогоплательщиков от кадастровой стоимости – потери бюджета.',
      sliderText3Content: 'Сообщи, направим информацию в госорганы!',
      sliderText4Title: 'Нецелевое использование земельного участка.',
      sliderText4Content: 'Сообщи, направим информацию в госорганы!',
      sliderText5Title: 'Самовольное строительство, неоформленный объект недвижимости!',
      sliderText5Content: 'Сообщи, направим информацию в госорганы!',
      
      // Putin Quotes Section
      putinName: 'Путин В.В.',
      putinPosition: 'Позиция главы государства',
      putinMainQuote: 'По мнению главы государства, налоговая система должна обеспечивать поступление ресурсов для решения общенациональных задач, а также для реализации региональных программ. Она призвана сокращать неравенство, причём не только в обществе, но и в социально-экономическом развитии регионов, учитывать уровень доходов граждан и компаний.',
      putinQuote1: 'При этом нужно, безусловно, закрыть все лазейки, которые используются некоторыми компаниями для уклонения от уплаты налогов или занижения налоговых платежей',
      putinQuote2: 'Налоговая политика должна быть не только эффективной, но и справедливой',
      putinQuote3: 'Коррупция — это недополучение государственных доходов, в том числе налоговых',
      putinQuote4: 'Все хитрят. Нужно просто найти оптимальный вариант, чтобы и потребитель получал выгоду, и государство не страдало, а отрасль развивалась',
      sourceText: 'Источник',
      
      // Object Check Form
      checkFormTitle: 'Форма проверки объекта',
      checkFormDescription: 'Сообщайте о нарушениях, которые, по вашему мнению, имеют место. Мы не собираем данные о пользователях. Если вы считаете, что нарушено законодательство, сообщите об этом анонимно. Наши специалисты проверят информацию и, если она подтвердится, направят данные в государственные органы.',
      checkFormSubmit: 'Отправить сообщение',
      
      // Home page texts
      homeTitle: 'Добро пожаловать на портал обращений граждан',
      homeSubtitle: 'Здесь вы можете подать жалобу или обращение',
      homeDescription: 'Наша система обеспечивает быстрое и качественное рассмотрение ваших обращений',
      complaintsFormTitle: 'Форма подачи обращения',
      complaintsFormDescription: 'Заполните все поля для подачи обращения',
      complaintsFormSubmit: 'Отправить обращение',
      
      // Form fields
      formFieldName: 'Имя',
      formFieldEmail: 'Email',
      formFieldPhone: 'Телефон',
      formFieldSubject: 'Тема обращения',
      formFieldMessage: 'Текст обращения',
      formFieldCaptcha: 'Введите код с картинки',
      
      // Sections
      newsSection: 'Новости',
      documentsSection: 'Документы',
      authoritiesSection: 'Контролирующие органы',
      
      // Buttons
      btnReadMore: 'Читать далее',
      btnBack: 'Назад',
      btnNext: 'Далее',
      btnSave: 'Сохранить',
      btnCancel: 'Отменить',
      btnEdit: 'Редактировать',
      btnDelete: 'Удалить',
      btnAdd: 'Добавить',
      
      // Footer
      footerText: 'Все права защищены',
      footerContacts: 'Контакты для связи',
      footerWorkingHours: 'Режим работы: Пн-Пт 9:00-18:00',
      
      // Messages
      successMessage: 'Операция выполнена успешно',
      errorMessage: 'Произошла ошибка',
      loadingText: 'Загрузка...',
      noDataText: 'Нет данных для отображения'
    }
  });

  const generateId = () => Date.now().toString();

  // Report methods
  const addReport = (report: Omit<Report, 'id' | 'date'>) => {
    const newReport: Report = {
      ...report,
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setState(prevState => {
      const newReports = [...prevState.reports, newReport];
      saveToStorage('reports', newReports);
      return {
        ...prevState,
        reports: newReports
      };
    });
  };

  const updateReportStatus = (id: string, status: Report['status']) => {
    setState(prevState => ({
      ...prevState,
      reports: prevState.reports.map(report => 
        report.id === id ? { ...report, status } : report
      )
    }));
  };

  const deleteReport = (id: string) => {
    setState(prevState => ({
      ...prevState,
      reports: prevState.reports.filter(report => report.id !== id)
    }));
  };

  const publishReportAsNews = (reportId: string) => {
    const report = state.reports.find(r => r.id === reportId);
    if (report) {
      const newsItem: NewsItem = {
        id: generateId(),
        title: `Обращение ${report.id}`,
        content: report.content,
        preview: report.content.substring(0, 150) + (report.content.length > 150 ? '...' : ''),
        date: new Date().toISOString().split('T')[0],
        isPublished: true
      };
      setState(prevState => {
        const newNewsList = [...prevState.news, newsItem];
        saveToStorage('news', newNewsList);
        return {
          ...prevState,
          news: newNewsList
        };
      });
    }
  };

  // News methods
  const addNews = (news: Omit<NewsItem, 'id' | 'date'>) => {
    const newNews: NewsItem = {
      ...news,
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      isPublished: true // Default to published
    };
    setState(prevState => {
      const newNewsList = [...prevState.news, newNews];
      saveToStorage('news', newNewsList);
      return {
        ...prevState,
        news: newNewsList
      };
    });
  };

  const updateNews = (news: NewsItem) => {
    setState(prevState => {
      const updatedNews = prevState.news.map(n => n.id === news.id ? news : n);
      saveToStorage('news', updatedNews);
      return {
        ...prevState,
        news: updatedNews
      };
    });
  };

  const deleteNews = (id: string) => {
    setState(prevState => {
      const filteredNews = prevState.news.filter(news => news.id !== id);
      saveToStorage('news', filteredNews);
      return {
        ...prevState,
        news: filteredNews
      };
    });
  };

  // Document methods
  const addDocument = (document: Omit<DocumentItem, 'id'>) => {
    const newDocument: DocumentItem = {
      ...document,
      id: generateId()
    };
    setState(prevState => {
      const newDocuments = [...prevState.documents, newDocument];
      saveToStorage('documents', newDocuments);
      return {
        ...prevState,
        documents: newDocuments
      };
    });
  };

  const updateDocument = (document: DocumentItem) => {
    setState(prevState => {
      const updatedDocuments = prevState.documents.map(d => d.id === document.id ? document : d);
      saveToStorage('documents', updatedDocuments);
      return {
        ...prevState,
        documents: updatedDocuments
      };
    });
  };

  const deleteDocument = (id: string) => {
    setState(prevState => {
      const filteredDocuments = prevState.documents.filter(doc => doc.id !== id);
      saveToStorage('documents', filteredDocuments);
      return {
        ...prevState,
        documents: filteredDocuments
      };
    });
  };

  // Authority methods
  const addAuthority = (authority: Omit<Authority, 'id'>) => {
    const newAuthority: Authority = {
      ...authority,
      id: generateId()
    };
    setState(prevState => ({
      ...prevState,
      authorities: [...prevState.authorities, newAuthority]
    }));
  };

  const updateAuthority = (authority: Authority) => {
    setState(prevState => ({
      ...prevState,
      authorities: prevState.authorities.map(a => a.id === authority.id ? authority : a)
    }));
  };

  const deleteAuthority = (id: string) => {
    setState(prevState => ({
      ...prevState,
      authorities: prevState.authorities.filter(auth => auth.id !== id)
    }));
  };

  // Slider methods
  const addSliderItem = (item: Omit<SliderItem, 'id'>) => {
    const newItem: SliderItem = {
      ...item,
      id: generateId()
    };
    setState(prevState => ({
      ...prevState,
      sliderItems: [...prevState.sliderItems, newItem]
    }));
  };

  const updateSliderItem = (item: SliderItem) => {
    setState(prevState => ({
      ...prevState,
      sliderItems: prevState.sliderItems.map(i => i.id === item.id ? item : i)
    }));
  };

  const deleteSliderItem = (id: string) => {
    setState(prevState => ({
      ...prevState,
      sliderItems: prevState.sliderItems.filter(item => item.id !== id)
    }));
  };

  const updateLogo = (path: string) => {
    setState(prevState => ({
      ...prevState,
      logoPath: path
    }));
  };

  // Site texts methods
  const updateSiteTexts = (texts: Partial<SiteTexts>) => {
    setState(prevState => ({
      ...prevState,
      siteTexts: {
        ...prevState.siteTexts,
        ...texts
      }
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      addReport,
      updateReportStatus,
      deleteReport,
      publishReportAsNews,
      addNews,
      updateNews,
      deleteNews,
      addDocument,
      updateDocument,
      deleteDocument,
      addAuthority,
      updateAuthority,
      deleteAuthority,
      addSliderItem,
      updateSliderItem,
      deleteSliderItem,
      updateLogo,
      updateSiteTexts,
    }}>
      {children}
    </AppContext.Provider>
  );
};
