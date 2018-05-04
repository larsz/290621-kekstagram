'use strict';
(function () {

  var renderPhotos = function (data) {
    var photosFragment = document.createDocumentFragment();
    data.forEach(function (photo) {
      photosFragment.appendChild(window.picture.render(photo));
    });

    return photosFragment;
  };

  var showThumbnails = function (data) {
    var renderedPhotos = renderPhotos(data);
    var photosListElement = document.querySelector('.pictures');
    var photosListItemElement = photosListElement.querySelectorAll('.picture__link');

    photosListItemElement.forEach(function (item) {
      item.parentNode.removeChild(item);
    });

    photosListElement.appendChild(renderedPhotos);
  };

  window.gallery = {
    show: showThumbnails
  };
})();
