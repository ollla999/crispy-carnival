// src/telegram.js
// Инициализация Telegram Web App
export const initTelegramApp = () => {
  try {
    // Проверка, доступен ли Telegram WebApp через TMA SDK
    if (window.TMA) {
      window.TMA.ready();
      return true;
    }
    
    // Проверка, доступен ли Telegram WebApp через стандартный API
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      return true;
    }
    
    console.warn('Telegram WebApp API не найден');
    return false;
  } catch (error) {
    console.error('Ошибка инициализации Telegram WebApp:', error);
    return false;
  }
};

// Получение размеров окна для графа
export const getViewportSize = () => {
  // Проверка наличия TMA SDK
  if (window.TMA) {
    return {
      width: window.TMA.viewportStableWidth || window.innerWidth,
      height: window.TMA.viewportHeight || window.innerHeight
    };
  }
  
  // Проверка наличия стандартного Telegram WebApp API
  if (window.Telegram && window.Telegram.WebApp) {
    return {
      width: window.Telegram.WebApp.viewportStableWidth || window.innerWidth,
      height: window.Telegram.WebApp.viewportHeight || window.innerHeight
    };
  }
  
  // Возврат стандартных размеров окна браузера
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};