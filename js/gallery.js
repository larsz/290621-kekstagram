'use strict';
(function () {
  var photosListElement = document.querySelector('.pictures');

  var renderPhotos = function (data) {
    var photos = document.createDocumentFragment();
    data.forEach(function (photo) {
      photos.appendChild(window.picture.render(photo));
    });

    return photos;
  };

  var showThumbnails = function (fragment) {
    photosListElement.appendChild(fragment);
  };

  var successLoadDataHandler = function (loadedData) {
    var renderedPhotos = renderPhotos(loadedData);
    showThumbnails(renderedPhotos);
    window.sort.init();
  };

  window.backend.load(successLoadDataHandler, window.notification.showError);

})();
