'use strict';

(function () {

  var sliderElement;
  var sliderPinElement;
  var effectLevelLineElement;
  var effectLevelInputElement;
  var scaleLevelElement;

  var SLIDER_MAX_VALUE = 453;

  var updateSlider;
  var isSliderCreated;

  var initDOMElements = function () {
    sliderElement = document.querySelector('.img-upload__scale');
    sliderPinElement = sliderElement.querySelector('.scale__pin');
    effectLevelLineElement = sliderElement.querySelector('.scale__line');
    effectLevelInputElement = sliderElement.querySelector('.scale__value');
    scaleLevelElement = effectLevelLineElement.querySelector('.scale__level');

    isSliderCreated = true;
  };

  var sliderPinMouseDownHandler = function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startX - moveEvt.clientX;
      startX = moveEvt.clientX;

      var actualPinPosition = sliderPinElement.offsetLeft - shift;
      updateSlider(actualPinPosition);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };

  var sliderPinKeyDownHandler = function (evt) {
    var shift = sliderPinElement.offsetLeft;
    var shiftStep = 2;

    if (evt.keyCode === window.utils.KeyCode.ARROW_LEFT) {
      shift -= shiftStep;
      updateSlider(shift);
    } else if (evt.keyCode === window.utils.KeyCode.ARROW_RIGHT) {
      shift += shiftStep;
      updateSlider(shift);
    }
  };

  var sliderLineClickHandler = function (evt) {
    if (!evt.target.classList.contains('scale__pin')) {
      updateSlider(evt.offsetX);
    }
  };

  var initSlider = function (callback) {

    if (!isSliderCreated) {
      initDOMElements();
      sliderPinElement.addEventListener('mousedown', sliderPinMouseDownHandler);
      sliderPinElement.addEventListener('keydown', sliderPinKeyDownHandler);
      effectLevelLineElement.addEventListener('click', sliderLineClickHandler);
    }

    updateSlider = function (pinPosition) {
      var intensityLevel = ((pinPosition / effectLevelLineElement.offsetWidth) * 100).toFixed(2);

      if (intensityLevel > 0 && intensityLevel <= 100) {
        sliderPinElement.style.left = intensityLevel + '%';
        scaleLevelElement.style.width = intensityLevel + '%';
        effectLevelInputElement.value = intensityLevel;
      }

      if (typeof callback === 'function') {
        callback(intensityLevel);
      }
    };

    var resetSlider = function () {
      updateSlider(SLIDER_MAX_VALUE);
    };

    resetSlider();
  };

  var destroySlider = function () {
    isSliderCreated = false;
    sliderPinElement.removeEventListener('mousedown', sliderPinMouseDownHandler);
    sliderPinElement.removeEventListener('keydown', sliderPinKeyDownHandler);
    effectLevelLineElement.removeEventListener('click', sliderLineClickHandler);
  };

  window.slider = {
    init: initSlider,
    destroy: destroySlider
  };

})();
