import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, MessageSquare, FileText, Building, Users, Eye, EyeOff, Image, Type, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    state,
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
    updateSiteTexts
  } = useAppContext();
  
  const { reports, news, documents, authorities, sliderItems, logoPath, siteTexts } = state;

  const [activeTab, setActiveTab] = useState<'reports' | 'news' | 'documents' | 'authorities' | 'slider' | 'texts'>('reports');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedReports, setExpandedReports] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleStatusChange = (reportId: string, status: 'pending' | 'reviewed' | 'forwarded') => {
    updateReportStatus(reportId, status);
  };

  const handlePublishAsNews = (reportId: string) => {
    publishReportAsNews(reportId);
  };

  const handleAddNews = (formData: any) => {
    addNews({ title: formData.title, content: formData.content });
    setShowAddForm(false);
  };

  const handleUpdateNews = (newsItem: any) => {
    updateNews(newsItem);
    setEditingItem(null);
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Удалить эту новость?')) {
      deleteNews(id);
    }
  };

  const handleAddDocument = (formData: any) => {
    // Проверяем, есть ли загруженный файл или URL
    let documentUrl = formData.url;
    
    // Если загружен файл, создаем для него URL (в реальном приложении файл бы загружался на сервер)
    if (formData.file && formData.file.size > 0) {
      documentUrl = URL.createObjectURL(formData.file);
    }
    
    if (!documentUrl) {
      alert('Необходимо указать ссылку на документ или загрузить файл');
      return;
    }
    
    addDocument({ 
      title: formData.title,
      name: formData.title,
      description: formData.description,
      category: formData.category,
      url: documentUrl,
      link: documentUrl,
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const handleUpdateDocument = (document: any) => {
    updateDocument(document);
    setEditingItem(null);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Удалить этот документ?')) {
      deleteDocument(id);
    }
  };

  const handleAddAuthority = (formData: any) => {
    // Обрабатываем функции - разделяем по переносам строк
    const functions = formData.functions ? formData.functions.split('\n').filter((f: string) => f.trim()) : [];
    
    addAuthority({ 
      name: formData.name,
      shortName: formData.shortName,
      description: formData.description,
      website: formData.website,
      contact: formData.contact || formData.phone, // поддержка старого поля contact
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      functions: functions
    });
    setShowAddForm(false);
  };

  const handleUpdateAuthority = (formData: any) => {
    // Обрабатываем функции - разделяем по переносам строк
    const functions = formData.functions ? formData.functions.split('\n').filter((f: string) => f.trim()) : [];
    
    const updatedAuthority = {
      ...editingItem,
      ...formData,
      functions: functions,
      contact: formData.contact || formData.phone // поддержка старого поля contact
    };
    
    updateAuthority(updatedAuthority);
    setEditingItem(null);
  };

  const handleDeleteAuthority = (id: string) => {
    if (confirm('Удалить этот орган?')) {
      deleteAuthority(id);
    }
  };

  const renderAddForm = () => {
    if (!showAddForm) return null;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      switch (activeTab) {
        case 'news':
          handleAddNews(data);
          break;
        case 'documents':
          handleAddDocument(data);
          break;
        case 'authorities':
          handleAddAuthority(data);
          break;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            Добавить {activeTab === 'news' ? 'новость' : activeTab === 'documents' ? 'документ' : 'орган'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'news' && (
              <>
                <input name="title" placeholder="Заголовок" className="w-full p-2 border rounded" required />
                <textarea name="content" placeholder="Содержание" className="w-full p-2 border rounded h-32" required />
                <input name="preview" placeholder="Краткое описание" className="w-full p-2 border rounded" required />
                <input name="image" placeholder="URL изображения (необязательно)" className="w-full p-2 border rounded" />
              </>
            )}
            
            {activeTab === 'documents' &&
              <>
                <input name="title" placeholder="Название документа" className="w-full p-2 border rounded" required />
                <textarea name="description" placeholder="Описание" className="w-full p-2 border rounded" required />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Документ</label>
                  <input name="url" placeholder="Ссылка на документ" className="w-full p-2 border rounded" />
                  <div className="text-center text-gray-500">или</div>
                  <input name="file" type="file" accept=".pdf,.doc,.docx,.txt" className="w-full p-2 border rounded" />
                  <p className="text-sm text-gray-500">Поддерживаются файлы: PDF, DOC, DOCX, TXT</p>
                </div>
                <input name="category" placeholder="Категория" className="w-full p-2 border rounded" required />
              </>
            }
            
            {activeTab === 'authorities' && (
              <>
                <input name="name" placeholder="Полное название органа" className="w-full p-2 border rounded" required />
                <input name="shortName" placeholder="Краткое название (например, ФНС России)" className="w-full p-2 border rounded" />
                <textarea name="description" placeholder="Описание деятельности" className="w-full p-2 border rounded h-20" required />
                <input name="website" placeholder="Официальный веб-сайт" className="w-full p-2 border rounded" />
                <input name="phone" placeholder="Телефон" className="w-full p-2 border rounded" />
                <input name="email" placeholder="Email" className="w-full p-2 border rounded" />
                <input name="address" placeholder="Адрес" className="w-full p-2 border rounded" />
                <textarea name="functions" placeholder="Основные функции (каждая с новой строки)" className="w-full p-2 border rounded h-24" />
              </>
            )}
            
            <div className="flex space-x-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Добавить
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderEditForm = () => {
    if (!editingItem) return null;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      const updatedItem = {
        ...editingItem,
        ...data,
        isPublished: data.isPublished === 'on'
      };

      switch (activeTab) {
        case 'news':
          handleUpdateNews(updatedItem);
          break;
        case 'documents':
          handleUpdateDocument(updatedItem);
          break;
        case 'authorities':
          handleUpdateAuthority(updatedItem);
          break;
        case 'slider':
          updateSliderItem(updatedItem);
          setEditingItem(null);
          break;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Редактировать</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'news' && (
              <>
                <input name="title" defaultValue={editingItem.title} placeholder="Заголовок" className="w-full p-2 border rounded" required />
                <textarea name="content" defaultValue={editingItem.content} placeholder="Содержание" className="w-full p-2 border rounded h-32" required />
                <input name="preview" defaultValue={editingItem.preview} placeholder="Краткое описание" className="w-full p-2 border rounded" required />
                <input name="image" defaultValue={editingItem.image || ''} placeholder="URL изображения" className="w-full p-2 border rounded" />
                <label className="flex items-center space-x-2">
                  <input name="isPublished" type="checkbox" defaultChecked={editingItem.isPublished} />
                  <span>Опубликовано</span>
                </label>
              </>
            )}
            
            {activeTab === 'documents' && (
              <>
                <input name="title" defaultValue={editingItem.title} placeholder="Название документа" className="w-full p-2 border rounded" required />
                <textarea name="description" defaultValue={editingItem.description} placeholder="Описание" className="w-full p-2 border rounded" required />
                <input name="url" defaultValue={editingItem.url} placeholder="Ссылка на документ" className="w-full p-2 border rounded" required />
                <input name="category" defaultValue={editingItem.category} placeholder="Категория" className="w-full p-2 border rounded" required />
              </>
            )}
            
            {activeTab === 'authorities' && (
              <>
                <input name="name" defaultValue={editingItem.name} placeholder="Полное название органа" className="w-full p-2 border rounded" required />
                <input name="shortName" defaultValue={editingItem.shortName || ''} placeholder="Краткое название" className="w-full p-2 border rounded" />
                <textarea name="description" defaultValue={editingItem.description} placeholder="Описание деятельности" className="w-full p-2 border rounded h-20" required />
                <input name="website" defaultValue={editingItem.website || ''} placeholder="Официальный веб-сайт" className="w-full p-2 border rounded" />
                <input name="phone" defaultValue={editingItem.phone || ''} placeholder="Телефон" className="w-full p-2 border rounded" />
                <input name="email" defaultValue={editingItem.email || ''} placeholder="Email" className="w-full p-2 border rounded" />
                <input name="address" defaultValue={editingItem.address || ''} placeholder="Адрес" className="w-full p-2 border rounded" />
                <textarea name="functions" defaultValue={editingItem.functions ? editingItem.functions.join('\n') : ''} placeholder="Основные функции (каждая с новой строки)" className="w-full p-2 border rounded h-24" />
              </>
            )}
            
            <div className="flex space-x-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Сохранить
              </button>
              <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white shadow-lg z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Панель администратора</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="flex space-x-1 mb-6 border-b">
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 font-medium ${activeTab === 'reports' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              <MessageSquare className="inline mr-2" size={16} />
              Обращения
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 font-medium ${activeTab === 'news' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              <FileText className="inline mr-2" size={16} />
              Новости
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 font-medium ${activeTab === 'documents' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              <FileText className="inline mr-2" size={16} />
              Документы
            </button>
            <button
              onClick={() => setActiveTab('authorities')}
              className={`px-4 py-2 font-medium ${activeTab === 'authorities' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              <Building className="inline mr-2" size={16} />
              Органы власти
            </button>
            <button
              onClick={() => setActiveTab('slider')}
              className={`px-4 py-2 font-medium ${activeTab === 'slider' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              <Image className="inline mr-2" size={16} />
              Слайдер
            </button>
            <button
              onClick={() => setActiveTab('texts')}
              className={`px-4 py-2 font-medium ${activeTab === 'texts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              <Type className="inline mr-2" size={16} />
              Тексты сайта
            </button>
          </div>

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Обращения граждан</h3>
              {reports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Нет обращений для отображения
                </div>
              ) : (
                <div className="space-y-4">
                  {reports.map((report) => {
                    const isExpanded = expandedReports.includes(report.id);
                    const contentPreview = report.content.length > 200 ? report.content.substring(0, 200) + '...' : report.content;
                    
                    return (
                      <div key={report.id} className="border rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">#{report.id}</span>
                            <span className="text-sm text-gray-500">{report.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <select
                              value={report.status}
                              onChange={(e) => handleStatusChange(report.id, e.target.value as any)}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="pending">В ожидании</option>
                              <option value="reviewed">Рассмотрено</option>
                              <option value="forwarded">Передано</option>
                            </select>
                            {!report.isPublished && (
                              <button
                                onClick={() => handlePublishAsNews(report.id)}
                                className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 border border-blue-200 rounded"
                                title="Опубликовать как новость"
                              >
                                Опубликовать
                              </button>
                            )}
                            <button
                              onClick={() => {
                                if (confirm('Удалить это обращение?')) {
                                  deleteReport(report.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Удалить обращение"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-gray-700">
                          {isExpanded ? (
                            <div className="whitespace-pre-wrap">{report.content}</div>
                          ) : (
                            <div>{contentPreview}</div>
                          )}
                          
                          {report.content.length > 200 && (
                            <button
                              onClick={() => {
                                if (isExpanded) {
                                  setExpandedReports(prev => prev.filter(id => id !== report.id));
                                } else {
                                  setExpandedReports(prev => [...prev, report.id]);
                                }
                              }}
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp size={16} />
                                  <span>Скрыть</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown size={16} />
                                  <span>Показать полностью</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded font-medium ${
                              report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              report.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {report.status === 'pending' ? 'В ожидании' :
                               report.status === 'reviewed' ? 'Рассмотрено' : 'Передано'}
                            </span>
                            {report.isPublished && (
                              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
                                ✓ Опубликовано
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            Символов: {report.content.length}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Управление новостями</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Добавить новость</span>
                </button>
              </div>
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                        <p className="text-gray-600 text-sm">{item.preview}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          {item.isPublished ? (
                            <span className="flex items-center text-green-600 text-sm">
                              <Eye size={14} className="mr-1" />
                              Опубликовано
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-600 text-sm">
                              <EyeOff size={14} className="mr-1" />
                              Скрыто
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Управление документами</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Добавить документ</span>
                </button>
              </div>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{doc.title}</h4>
                        <p className="text-sm text-gray-500 mb-2">{doc.category}</p>
                        <p className="text-gray-600 text-sm">{doc.description}</p>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                          Перейти к документу
                        </a>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(doc)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slider Tab */}
          {activeTab === 'slider' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Управление слайдером</h3>
              <div className="space-y-4">
                {sliderItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-32 h-20 border rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.imagePath} 
                          alt={item.caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/image.png';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Изображение</label>
                            <input
                              type="text"
                              value={item.imagePath}
                              onChange={(e) => updateSliderItem({ ...item, imagePath: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-md mb-2"
                              placeholder="/namber1.png"
                            />
                            <div className="text-center text-gray-500 mb-2">или</div>
                            <input
                              type="file"
                              accept="image/*"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // В реальном приложении здесь бы был upload на сервер
                                  // Для демонстрации просто создаем URL
                                  const url = URL.createObjectURL(file);
                                  updateSliderItem({ ...item, imagePath: url });
                                }
                              }}
                            />
                            <p className="text-sm text-gray-500 mt-1">Поддерживаются: JPG, PNG, GIF, WebP</p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Подпись</label>
                            <input
                              type="text"
                              value={item.caption}
                              onChange={(e) => updateSliderItem({ ...item, caption: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Описание слайда"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => {
                            if (confirm('Удалить этот слайд?')) {
                              deleteSliderItem(item.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <button
                    onClick={() => {
                      const newId = (sliderItems.length + 1).toString();
                      addSliderItem({
                        imagePath: `/namber${newId}.png`,
                        caption: `Слайд ${newId}`
                      });
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2 mx-auto"
                  >
                    <Plus size={16} />
                    <span>Добавить слайд</span>
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Доступные изображения:</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <div key={num} className="text-center">
                        <div className="w-16 h-12 border rounded bg-white overflow-hidden">
                          <img 
                            src={`/namber${num}.png`} 
                            alt={`Изображение ${num}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <p className="text-xs mt-1 text-gray-600">/namber{num}.png</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

{/* Site Texts Tab */}
          {activeTab === 'texts' && (
            <div>
              <h3 className="text-lg font-semibold mb-6">Редактирование текстов сайта</h3>
              

              {/* Секция Слайдера с текстом */}
              												<div className="mb-8 p-4 border rounded-lg bg-orange-50">
                											                  	                                  <h4 className="text-md font-semibold mb-4  text-orange-800">📝 Текстовый слайдер</h4>
                	               	                                <div className="space-y-4">
                  	                    	                                      <div>
                    	                    		                      <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок слайдера</label>
                                            <input
                        	                  	 type="text"
        	                                   	 className="w-full p-2 border border-gray-300 rounded-md"
        	                                   	 value={siteTexts.sliderTitle}
        	                                   	 onChange={(e) => updateSiteTexts({ sliderTitle: e.target.value })}
                     	                 	    />
                  	                  	</div>
                  	                     	 <div>
                    	                    	 <label className="block text-sm font-medium text-gray-700 mb-1">Описание слайдера</label>
        	                                   <textarea
                      	                  	  className="w-full p-2 border border-gray-300 rounded-md h-20"
                      	                  	  value={siteTexts.sliderDescription}
                      	                  	  onChange={(e) => updateSiteTexts({ sliderDescription: e.target.value })}
                    	                    	 />
                  	                  	</div>
                  	                  	 <div className="grid grid-cols-2 gap-4">
                           	                <div>
                            		              <label className="block text-sm font-medium text-gray-700 mb-1">Кнопка "Назад"</label>
        	                                    <input
                      	                      type="text"
                      	                      className="w-full p-2 border border-gray-300 rounded-md"
                      	                      value={siteTexts.sliderButtonPrev}
                      	                      onChange={(e) => updateSiteTexts({ sliderButtonPrev: e.target.value })}
                      	                      />
             	                               </div>
                    	                        	 <div>
            	                                    <label className="block text-sm font-medium text-gray-700 mb-1">Кнопка "Далее"</label>
                      	                           <input
                        	                         type="text"
                        	                         className="w-full p-2 border border-gray-300 rounded-md"
                        	                         value={siteTexts.sliderButtonNext}
                        	                         onChange={(e) => updateSiteTexts({ sliderButtonNext: e.target.value })}
                        	                         />
                    	                        </div>
                                    </div>
                	               </div>
              	</div>

              	{/* Секция Цитаты Путина */}
              	<div className="mb-8 p-4 border rounded-lg bg-yellow-50">
                	                  <h4 className="text-md font-semibold mb-4 text-yellow-800">👤 Цитаты Путина</h4>
                	                 <div className="space-y-4">
                  	        <div className="grid grid-cols-2 gap-4">
                    	        <div>
                      	      <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                          	   <input
                             	  type="text"
                              	 className="w-full p-2 border border-gray-300 rounded-md"
                                value={siteTexts.putinName}
                                onChange={(e) => updateSiteTexts({ putinName: e.target.value })}
                              />
                    	  </div>
                    	  <div>
                    	  	    <label className="block text-sm font-medium text-gray-700 mb-1">Позиция</label>
                      	  	  <input
                      	                                                                                                                                                               	type="text"
                       	 	    className="w-full p-2 border border-gray-300 rounded-md"
                            	   value={siteTexts.putinPosition}
                            	   onChange={(e) => updateSiteTexts({ putinPosition: e.target.value })}
                          	  />
                  	  	</div>
                  	   </div>
                  	  <div>
                    	  <label className="block text-sm font-medium text-gray-700 mb-1">Основная цитата</label>
                      	<textarea
                       	 className="w-full p-2 border border-gray-300 rounded-md h-28"
                                value={siteTexts.putinMainQuote}
                                onChange={(e) => updateSiteTexts({ putinMainQuote: e.target.value })}
                            />
                 	   </div>
                  	<div>
                  	    <label className="block text-sm font-medium text-gray-700 mb-1">Цитата 1</label>
                    	  <textarea
                     	  className="w-full p-2 border border-gray-300 rounded-md h-20"
                      	  value={siteTexts.putinQuote1}
                      	  onChange={(e) => updateSiteTexts({ putinQuote1: e.target.value })}
                     	 />
                  </div>
                   <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Цитата 2</label>
                       <textarea
                            className="w-full p-2 border border-gray-300 rounded-md h-20"
                            value={siteTexts.putinQuote2}
                          onChange={(e) => updateSiteTexts({ putinQuote2: e.target.value })}
                          />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цитата 3</label>
                   <textarea
           	          className="w-full p-2 border border-gray-300 rounded-md h-20"
                      value={siteTexts.putinQuote3}
                      onChange={(e) => updateSiteTexts({ putinQuote3: e.target.value })}
                    />
                  	</div>
                  	<div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цитата 4</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md h-20"
                  	      value={siteTexts.putinQuote4}
             	               onChange={(e) => updateSiteTexts({ putinQuote4: e.target.value })}
                          	   />
                  	</div>
                  	<div>
                    	<label className="block text-sm font-medium text-gray-700 mb-1">Источник</label>
                   	 <textarea
                      	className="w-full p-2 border border-gray-300 rounded-md h-20"
               	       value={siteTexts.sourceText}
             	         onChange={(e) => updateSiteTexts({ sourceText: e.target.value })}
                        />
                  </div>
                </div>
              </div>

              {/* Секция Форма проверки объекта */}
              <div className="mb-8 p-4 border rounded-lg bg-blue-50">
                <h4 className="text-md font-semibold mb-4 text-blue-800">📋 Форма проверки объекта</h4>
                <div className="space-y-4">
                  	<div>
                    	 <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок формы</label>
                  	  <input
                      	 className="w-full p-2 border border-gray-300 rounded-md"
                        value={siteTexts.checkFormTitle}
                        onChange={(e) => updateSiteTexts({ checkFormTitle: e.target.value })}
                      />
                 	 </div>
                 	 <div>
                    	 <label className="block text-sm font-medium text-gray-700 mb-1">Описание формы</label>
                     	<textarea
                      	 className="w-full p-2 border border-gray-300 rounded-md h-20"
                      	 value={siteTexts.checkFormDescription}
                                               onChange={(e) => updateSiteTexts({ checkFormDescription: e.target.value })}
                     	  />
                  </div>
                  <div>
                  	   <label className="block text-sm font-medium text-gray-700 mb-1">Текст кнопки отправки</label>
                  	   <input
                    	   className="w-full p-2 border border-gray-300 rounded-md"
                        value={siteTexts.checkFormSubmit}
                        onChange={(e) => updateSiteTexts({ checkFormSubmit: e.target.value })}
                    	  />
                 	 </div>
                </div>
              </div>

              {/* Секция Логотип сайта */}
              <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h4 className="text-md font-semibold mb-4 text-gray-800">🖼️ Логотип сайта</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Путь к логотипу</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={logoPath}
                      onChange={(e) => updateLogo(e.target.value)}
                      placeholder="/image.png"
                    />
                  </div>
                  <div className="text-center">
                    <img 
                      src={logoPath} 
                      alt="Логотип" 
                      className="mx-auto h-32 object-contain rounded-lg border" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  ✅ Все изменения сохраняются автоматически
                </button>
              </div>
            </div>
          )}
          {/* Authorities Tab */}
          {activeTab === 'authorities' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Управление органами власти</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Добавить орган</span>
                </button>
              </div>
              <div className="space-y-4">
                {authorities.map((auth) => (
                  <div key={auth.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{auth.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{auth.description}</p>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>Контакт: {auth.contact}</p>
                          <a href={auth.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {auth.website}
                          </a>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(auth)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteAuthority(auth.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {renderAddForm()}
      {renderEditForm()}
    </>
  );
};

export default AdminPanel;
