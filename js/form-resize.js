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

  var initDOMElements = function () {
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

  var resetResizerToDefault = function () {
    resizeValueElement.value = Resize.DEFAULT + '%';
  };

  var initResizer = function () {
    initDOMElements();
    resizePlusElement.addEventListener('click', resizePlusClickHandler);
    resizeMinusElement.addEventListener('click', resizeMinusClickHandler);

  };

  var destroyResizer = function () {
    resizePlusElement.removeEventListener('click', resizePlusClickHandler);
    resizeMinusElement.removeEventListener('click', resizeMinusClickHandler);
  };

  window.formResize = {
    init: initResizer,
    setDefault: resetResizerToDefault,
    destroy: destroyResizer
  };

})();
