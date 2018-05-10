'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var shuffleArray = function (arr) {
    var shuffledItems = [];
    var i;
    var n = arr.length;

    while (n) {
      i = Math.floor(Math.random() * n--);
      shuffledItems.push(arr.splice(i, 1)[0]);
    }
    return shuffledItems;
  };

  var removeChilds = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC && typeof action === 'function') {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER && typeof action === 'function') {
      action();
    }
  };

  window.utils = {
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray,
    removeChilds: removeChilds,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    KeyCode: KeyCode
  };

})();
