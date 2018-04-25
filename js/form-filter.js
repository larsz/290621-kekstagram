'use strict';

(function () {

  var Effects = {
    PREFIX_CLASS: 'effects__preview--',
    DEFAULT: 'none',
    PREVIEW_CLASS: 'img-upload__preview'
  };

  var wrapperElement = document.querySelector('.img-upload__wrapper');
  var previewElement = wrapperElement.querySelector('.img-upload__preview');
  var sliderElement = wrapperElement.querySelector('.img-upload__scale');
  var sliderPinElement = sliderElement.querySelector('.scale__pin');
  var effectsElement = wrapperElement.querySelector('.effects');
  var effectInputElement = effectsElement.querySelectorAll('.effects__radio');
  var effectLevelLineElement = sliderElement.querySelector('.scale__line');
  var effectLevelInputElement = sliderElement.querySelector('.scale__value');
  var scaleLevelElement = effectLevelLineElement.querySelector('.scale__level');
  var resizeValueElement = wrapperElement.querySelector('.resize__control--value');

  sliderElement.classList.add('hidden');

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

  var updateSlider = function (pinPosition) {
    var intensityLevel = ((pinPosition / effectLevelLineElement.offsetWidth) * 100).toFixed(2);

    if (intensityLevel > 0 && intensityLevel < 100) {
      sliderPinElement.style.left = intensityLevel + '%';
      scaleLevelElement.style.width = intensityLevel + '%';
      effectLevelInputElement.value = intensityLevel;
    }

    applyFilter(intensityLevel);
  };

  var toogleSlider = function (isHidden) {
    if (isHidden) {
      sliderElement.classList.add('hidden');
    } else {
      sliderElement.classList.remove('hidden');
    }
  };

  var getCurrentFilter = function () {
    var currentFilter;
    for (var i = 0, max = effectInputElement.length; i < max; i++) {
      if (effectInputElement[i].checked) {
        currentFilter = effectInputElement[i].value;
        break;
      }
    }

    return currentFilter;
  };

  var setCurrentFilter = function (evt) {
    var clickedFilter = evt.target;
    var clickedFilterName = clickedFilter.id.split('-').pop();
    var isSliderHidden = clickedFilterName.includes('none');

    toogleSlider(isSliderHidden);
    previewElement.removeAttribute('style');

    previewElement.className = Effects.PREVIEW_CLASS + ' ' + Effects.PREFIX_CLASS + clickedFilterName;
    sliderPinElement.style.left = 100 + '%';
    scaleLevelElement.style.width = 100 + '%';
    resizeValueElement.value = 100 + '%';
  };

  var applyFilter = function (intensity) {
    var selectedFilter = getCurrentFilter();
    var appliedEffectClassName = Effects.PREFIX_CLASS + selectedFilter;
    previewElement.className = Effects.PREVIEW_CLASS + ' ' + appliedEffectClassName;

    sliderElement.classList.remove('hidden');
    var selectedIntensity = intensity / 100;

    var filters = {
      none: 'none',
      chrome: 'grayscale(' + selectedIntensity + ')',
      sepia: 'sepia(' + selectedIntensity + ')',
      marvin: 'invert(' + Math.round(selectedIntensity * 100) + '%)',
      phobos: 'blur(' + selectedIntensity * 3 + 'px)',
      heat: 'brightness(' + selectedIntensity * 3 + ')'
    };

    previewElement.style.filter = filters[selectedFilter];

  };

  var effectLevelLineClickHandler = function (clickedEvt) {
    if (!clickedEvt.target.classList.contains('scale__pin')) {
      updateSlider(clickedEvt.offsetX);
    }
  };

  effectsElement.addEventListener('change', setCurrentFilter);
  effectLevelLineElement.addEventListener('click', effectLevelLineClickHandler);

  window.formFilter = {
    sliderPinMouseDownHandler: sliderPinMouseDownHandler,
    sliderPinKeyDownHandler: sliderPinKeyDownHandler
  };

})();
