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
  var effectsElement = wrapperElement.querySelector('.effects');
  var effectInputElement = effectsElement.querySelectorAll('.effects__radio');
  var resizeValueElement = wrapperElement.querySelector('.resize__control--value');

  sliderElement.classList.add('hidden');

  var toogleSlider = function (isHidden) {
    if (isHidden) {
      sliderElement.classList.add('hidden');
    } else {
      sliderElement.classList.remove('hidden');
      window.slider.init(applyFilter);
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
    resizeValueElement.value = 100 + '%';
  };

  var applyFilter = function (intensity) {
    var selectedFilter = getCurrentFilter();
    var appliedEffectClassName = Effects.PREFIX_CLASS + selectedFilter;
    previewElement.className = Effects.PREVIEW_CLASS + ' ' + appliedEffectClassName;

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

  effectsElement.addEventListener('change', setCurrentFilter);

  window.formFilter = {
    apply: applyFilter
  };


})();
