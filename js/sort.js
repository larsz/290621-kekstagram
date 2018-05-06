'use strict';
(function () {

  var ACTIVE_FILTER_CLASS = 'img-filters__button--active';
  var INACTIVE_FILTERS_CLASS = 'img-filters--inactive';

  var sortGalleryElement;
  var sortGalleryBtnsElement;
  var selectedSortBtnElement;

  var photos = [];

  var initDOMElements = function () {
    sortGalleryElement = document.querySelector('.img-filters');
    sortGalleryBtnsElement = sortGalleryElement.querySelectorAll('.img-filters__button');
    selectedSortBtnElement = sortGalleryElement.querySelector('.img-filters__button--active');
  };

  var sortMethods = {
    'filter-recomended': function () {
      return photos;
    },
    'filter-popular': function (data) {
      data.sort(function (a, b) {
        return b.likes - a.likes;
      });
      return data;
    },
    'filter-discussed': function (data) {
      data.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      return data;
    },
    'filter-random': function (data) {
      return window.utils.shuffleArray(data);
    }
  };

  var initSorter = function () {
    initDOMElements();
    sortGalleryElement.classList.remove(INACTIVE_FILTERS_CLASS);

    sortGalleryBtnsElement.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {

        var clonedPhotos = photos.slice(0);
        var currentBtn = evt.target;
        var sortBy = currentBtn.id;

        if (!currentBtn.classList.contains(ACTIVE_FILTER_CLASS)) {
          clonedPhotos = sortMethods[sortBy](clonedPhotos);

          selectedSortBtnElement.classList.remove(ACTIVE_FILTER_CLASS);
          currentBtn.classList.add(ACTIVE_FILTER_CLASS);
          selectedSortBtnElement = currentBtn;

          window.debounce(window.gallery.show(clonedPhotos));
        }
      });
    });
  };

  var successLoadDataHandler = function (loadedData) {
    photos = loadedData;
    window.gallery.show(loadedData);
    initSorter();
  };

  window.backend.load(successLoadDataHandler, window.notification.showError);

})();
