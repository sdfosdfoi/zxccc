import React, { useState, useEffect } from 'react';
import { RefreshCw, Shield } from 'lucide-react';

interface CaptchaFieldProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const CaptchaField: React.FC<CaptchaFieldProps> = ({ value, onChange, isValid, onValidationChange }) => {
  const [question, setQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [operations] = useState(['+', '-']);
  const [currentOperation, setCurrentOperation] = useState('+');

  const generateQuestion = () => {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a, b, answer;

    switch (operation) {
      case '+':
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        answer = a + b;
        break;
      case '-':
        a = Math.floor(Math.random() * 20) + 10;
        b = Math.floor(Math.random() * 10) + 1;
        answer = a - b;
        break;
      default:
        a = 2;
        b = 3;
        answer = 5;
    }

    setQuestion({ a, b, answer });
    setCurrentOperation(operation);
    onChange(''); // Сбрасываем введенное значение
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const checkAnswer = () => {
    const isCorrect = parseInt(value) === question.answer;
    if (onValidationChange) {
      onValidationChange(isCorrect);
    }
    return isCorrect;
  };

  useEffect(() => {
    if (value) {
      checkAnswer();
    }
  }, [value, question.answer]);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        <Shield className="inline mr-2" size={16} />
        Проверка безопасности
      </label>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
              <span className="text-2xl font-bold text-gray-800">
                {question.a} {currentOperation} {question.b} = ?
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={generateQuestion}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            title="Обновить вопрос"
          >
            <RefreshCw size={16} />
            <span>Обновить</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-24 px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors ${
              value && checkAnswer()
                ? 'border-green-500 bg-green-50 focus:border-green-600'
                : value && !checkAnswer()
                ? 'border-red-500 bg-red-50 focus:border-red-600'
                : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="Ответ"
            required
          />
          
          {value && (
            <div className="flex items-center">
              {checkAnswer() ? (
                <div className="flex items-center text-green-600">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  </div>
                  <span className="text-sm font-medium">Правильно!</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-red-600 font-bold text-sm">✗</span>
                  </div>
                  <span className="text-sm font-medium">Неверно</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <p className="text-xs text-gray-600 mt-2">
          Решите простой пример для подтверждения, что вы не робот
        </p>
      </div>
    </div>
  );
};

export default CaptchaField;