'use strict';

(function () {

  var REQUEST_TIMEOUT = 10000;

  var SAVE_URL = 'https://js.dump.academy/kekstagram';
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var initXHR = function (successLoadHandler, errorLoadHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case Code.SUCCESS:
          successLoadHandler(xhr.response);
          break;
        case Code.BAD_REQUEST:
          errorLoadHandler('Статус ответа: ' + xhr.status + '. В запросе синтаксическая ошибка.');
          break;
        case Code.FORBIDDEN:
          errorLoadHandler('Статус ответа: ' + xhr.status + '. В запросе отказано, недостаточно прав.');
          break;
        case Code.NOT_FOUND:
          errorLoadHandler('Статус ответа: ' + xhr.status + '. Страница не найдена');
          break;
        case Code.SERVER_ERROR:
          errorLoadHandler('Статус ответа: ' + xhr.status + '. Ой, неполадки на сервере, попробуйте чуть позже.');
          break;
        default:
          errorLoadHandler('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorLoadHandler('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorLoadHandler('Запрос не успел выполниться за ' + REQUEST_TIMEOUT + ' мс');
    });

    return xhr;
  };

  var load = function (successLoadHandler, errorLoadHandler) {
    var xhr = initXHR(successLoadHandler, errorLoadHandler);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, successLoadHandler, errorLoadHandler) {
    var xhr = initXHR(successLoadHandler, errorLoadHandler);
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
