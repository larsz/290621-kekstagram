'use strict';

(function () {

  var Resize = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100
  };

  var uploadFormElement;
  var resizePlusElement;
  var resizeMinusElement;
  var resizeValueElement;
  var previewElement;

  var initDom = function () {
    uploadFormElement = document.querySelector('.img-upload__form');
    resizePlusElement = uploadFormElement.querySelector('.resize__control--plus');
    resizeMinusElement = uploadFormElement.querySelector('.resize__control--minus');
    resizeValueElement = uploadFormElement.querySelector('.resize__control--value');
    previewElement = uploadFormElement.querySelector('.img-upload__preview');
  };

  var resizeMinusClickHandler = function () {
    var resizeVal = Math.min(Resize.MAX, Math.max(Resize.MIN, parseInt(resizeValueElement.value, 10) - Resize.STEP));
    resizeValueElement.value = resizeVal + '%';
    previewElement.style.transform = 'scale(' + resizeVal / 100 + ')';
  };

  var resizePlusClickHandler = function () {
    var resizeVal = Math.min(Resize.MAX, Math.max(Resize.MIN, parseInt(resizeValueElement.value, 10) + Resize.STEP));
    resizeValueElement.value = resizeVal + '%';
    previewElement.style.transform = 'scale(' + resizeVal / 100 + ')';
  };

  var setupEventHandlers = function (setupMode) {
    var action = setupMode ? 'addEventListener' : 'removeEventListener';
    resizePlusElement[action]('click', resizePlusClickHandler);
    resizeMinusElement[action]('click', resizeMinusClickHandler);
  };

  var setDefault = function () {
    resizeValueElement.value = Resize.DEFAULT + '%';
  };

  var init = function () {
    initDom();
    setupEventHandlers(true);
  };

  var destroy = function () {
    setupEventHandlers(false);
  };

  window.formResize = {
    init: init,
    setDefault: setDefault,
    destroy: destroy
  };

})();
