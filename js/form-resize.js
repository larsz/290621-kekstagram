'use strict';

(function () {

  var Resize = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var resizeValueElement = uploadFormElement.querySelector('.resize__control--value');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');

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

  window.formResize = {
    increase: resizePlusClickHandler,
    decrease: resizeMinusClickHandler
  };

})();
