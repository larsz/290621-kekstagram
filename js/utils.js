'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  // common functions
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getRandomIndex = function (arr) {
    return getRandomNumber(0, arr.length - 1);
  };

  var getRandomElement = function (arr) {
    return arr[getRandomIndex(arr)];
  };

  var shuffleArray = function (arr) {
    var result = [];
    var i;
    var n = arr.length;

    while (n) {
      i = Math.floor(Math.random() * n--);
      result.push(arr.splice(i, 1)[0]);
    }
    return result;
  };

  var removeChilds = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  };

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomIndex: getRandomIndex,
    getRandomElement: getRandomElement,
    shuffleArray: shuffleArray,
    removeChilds: removeChilds,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    KeyCode: KeyCode,
    debounce: debounce
  };

})();
