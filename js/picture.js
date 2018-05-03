'use strict';
(function () {

  // DOM elements
  var photoTemplateElement = document.querySelector('#picture');

  // Render thumbnail
  var renderThumbnail = function (photo) {
    var clonedPhotoTemplate = photoTemplateElement.content.cloneNode(true);
    var clonedPhoto = clonedPhotoTemplate.querySelector('.picture__link');
    var clonedPhotoImg = clonedPhoto.querySelector('.picture__img');
    var clonedPhotoLikes = clonedPhoto.querySelector('.picture__stat--likes');
    var clonedPhotoComments = clonedPhoto.querySelector('.picture__stat--comments');

    clonedPhotoImg.src = photo.url;
    clonedPhotoLikes.textContent = photo.likes;
    clonedPhotoComments.textContent = photo.comments.length;

    clonedPhoto.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.preview.show(photo);
    });

    return clonedPhoto;
  };

  window.picture = {
    render: renderThumbnail
  };

})();
