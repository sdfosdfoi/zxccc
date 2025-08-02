import { useState, useEffect } from 'react';

export const useAdminPanel = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + Shift + A для открытия админ-панели
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setIsAdminOpen(true);
      }
      
      // Escape для закрытия
      if (event.key === 'Escape' && isAdminOpen) {
        setIsAdminOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminOpen]);

  return {
    isAdminOpen,
    openAdmin: () => setIsAdminOpen(true),
    closeAdmin: () => setIsAdminOpen(false)
  };
};