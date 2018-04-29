'use strict';

(function () {

  var Resize = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100
  };

  var uploadFormElement;
  var resizeValueElement;
  var previewElement;

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

  var init = function () {
    uploadFormElement = document.querySelector('.img-upload__form');
    resizeValueElement = uploadFormElement.querySelector('.resize__control--value');
    previewElement = uploadFormElement.querySelector('.img-upload__preview');
  };

  window.formResize = {
    increase: resizePlusClickHandler,
    decrease: resizeMinusClickHandler,
    init: init
  };

})();
