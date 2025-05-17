// Обработка TelegramGameProxy для минимального подавления ошибок
(function() {
  // Если TelegramGameProxy существует (например, при использовании Tuna)
  if (window.TelegramGameProxy) {
    // Заменяем метод receiveEvent пустой функцией, чтобы избежать ошибок
    window.TelegramGameProxy.receiveEvent = function() {
      // Пустая реализация - ничего не делает, но и не вызывает ошибок
      return true;
    };
    
    // Обработчик касаний для подавления ошибок
    document.addEventListener('touchstart', function(e) {
      // Ничего не делаем, просто перехватываем события
    }, {passive: true});
    
    document.addEventListener('touchmove', function(e) {
      // Ничего не делаем, просто перехватываем события
    }, {passive: true});
    
    document.addEventListener('touchend', function(e) {
      // Ничего не делаем, просто перехватываем события
    }, {passive: true});
  }
})();