'use strict';

(function () {

  var Effect = {
    PREFIX_CLASS: 'effects__preview--',
    DEFAULT: 'none',
    PREVIEW_CLASS: 'img-upload__preview'
  };

  var wrapperElement;
  var previewElement;
  var sliderElement;
  var effectsElement;
  var effectsInputsElement;
  var selectedEffectInputElement;
  var currentFilter;

  var resetRadios = function () {
    effectsInputsElement.forEach(function (radio) {
      radio.checked = false;
    });
  };

  var initDOMElements = function () {
    wrapperElement = document.querySelector('.img-upload__wrapper');
    previewElement = wrapperElement.querySelector('.img-upload__preview');
    sliderElement = wrapperElement.querySelector('.img-upload__scale');
    effectsElement = wrapperElement.querySelector('.effects');
    effectsInputsElement = wrapperElement.querySelectorAll('.effects__radio');
    selectedEffectInputElement = effectsElement.querySelector('.effects__radio:checked');
  };

  var toogleSlider = function (isHidden) {
    if (isHidden) {
      sliderElement.classList.add('hidden');
      window.slider.destroy();
    } else {
      sliderElement.classList.remove('hidden');
      window.slider.init(applyFilter);
    }
  };

  var setCurrentFilter = function (evt) {
    var clickedFilter = evt.target;
    var clickedFilterName = clickedFilter.id.split('-').pop();
    var isSliderHidden = clickedFilterName.includes('none');

    currentFilter.checked = false;
    clickedFilter.checked = true;
    currentFilter = clickedFilter;

    toogleSlider(isSliderHidden);
    previewElement.style.cssText = null;
    previewElement.className = Effect.PREVIEW_CLASS + ' ' + Effect.PREFIX_CLASS + clickedFilterName;
    window.formResize.setDefault();
  };

  var applyFilter = function (intensity) {
    var selectedFilter = currentFilter.value;
    var appliedEffectClassName = Effect.PREFIX_CLASS + selectedFilter;
    previewElement.className = Effect.PREVIEW_CLASS + ' ' + appliedEffectClassName;

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

  var effectsElementChangeHandler = function (evt) {
    setCurrentFilter(evt);
  };

  var initFilters = function () {
    initDOMElements();
    currentFilter = selectedEffectInputElement;

    sliderElement.classList.add('hidden');
    effectsElement.addEventListener('change', effectsElementChangeHandler);
  };

  var destroyFilters = function () {
    var defaultFilterElement = effectsElement.querySelector('#effect-none');
    previewElement.className = Effect.PREVIEW_CLASS;
    previewElement.style.cssText = null;
    effectsElement.removeEventListener('change', effectsElementChangeHandler);

    resetRadios();
    defaultFilterElement.checked = true;
  };

  window.formFilter = {
    init: initFilters,
    destroy: destroyFilters,
    apply: applyFilter
  };

})();
