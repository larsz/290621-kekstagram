'use strict';
(function () {

  var sortGalleryElement;
  var sortGalleryFormElement;
  var sortGalleryBtnElement;

  var ACTIVE_FILTER_CLASS = '';
  var INACTIVE_FILTERS_CLASS = 'img-filters--inactive';

  var initDOMElements = function () {
    sortGalleryElement = document.querySelector('.img-filters');
    sortGalleryFormElement = sortGalleryElement.querySelector('.img-filters__form');
    sortGalleryBtnElement = sortGalleryElement.querySelector('.img-filters__button');
  };

  var initSort = function () {
    initDOMElements();
    sortGalleryElement.classList.remove(INACTIVE_FILTERS_CLASS);
  };

  window.sort = {
    init: initSort
  };

})();
