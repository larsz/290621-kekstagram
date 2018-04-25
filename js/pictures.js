'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;

  // DOM elements
  var photoTemplateElement = document.querySelector('#picture');
  var photosListElement = document.querySelector('.pictures');

  var generatedPhotos = window.data.generateData(PHOTOS_QUANTITY);

  // Render thumbnails
  var createPhoto = function (photo) {
    var clonedPhotoTemplate = photoTemplateElement.content.cloneNode(true);
    var clonedPhoto = clonedPhotoTemplate.querySelector('.picture__link');
    var clonedPhotoImg = clonedPhoto.querySelector('.picture__img');
    var clonedPhotoLikes = clonedPhoto.querySelector('.picture__stat--likes');
    var clonedPhotoComments = clonedPhoto.querySelector('.picture__stat--comments');

    clonedPhotoImg.src = photo.url;
    clonedPhotoLikes.textContent = photo.likes;
    clonedPhotoComments.textContent = photo.comments.length;

    clonedPhoto.addEventListener('click', function () {
      window.preview.show(photo);
    });

    return clonedPhoto;
  };

  // Save thumbnails fragment
  var renderPhotos = function () {
    var photos = document.createDocumentFragment();
    generatedPhotos.forEach(function (photo) {
      photos.appendChild(createPhoto(photo));
    });

    return photos;
  };

  var renderedPhotos = renderPhotos();

  var showThumbnails = function (fragment) {
    photosListElement.appendChild(fragment);
  };

  showThumbnails(renderedPhotos);

})();
