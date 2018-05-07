'use strict';

(function () {

  var Avatar = {
    LIMITS: {
      MIN: 1,
      MAX: 6
    },
    PATH: 'img/avatar-',
    EXT: '.svg',
  };

  var bodyElement = document.querySelector('body');
  var featuredPhotoElement = document.querySelector('.big-picture');
  var featuredPhotoCommentsElement = featuredPhotoElement.querySelector('.social__comment-count');
  var featuredPhotoLoadMoreElement = featuredPhotoElement.querySelector('.social__comment-loadmore');
  var commentsTemplateElement = featuredPhotoElement.querySelector('.social__comments');
  var featuredPhotoCloseElement = featuredPhotoElement.querySelector('.big-picture__cancel');

  var renderComments = function (data) {
    var comments = document.createDocumentFragment();

    data.forEach(function (item) {
      var newComment = commentsTemplateElement.querySelector('.social__comment').cloneNode(true);
      var avatar = newComment.querySelector('.social__picture');

      newComment.textContent = item;
      avatar.src = Avatar.PATH + window.utils.getRandomNumber(Avatar.LIMITS.MIN, Avatar.LIMITS.MAX) + Avatar.EXT;

      var commentText = newComment.firstChild;
      newComment.insertBefore(avatar, commentText);

      comments.appendChild(newComment);
    });

    return comments;
  };

  var renderFeaturedPhoto = function (featuredPhoto) {
    var img = featuredPhotoElement.querySelector('.big-picture__img img');
    var description = featuredPhotoElement.querySelector('.social__caption');
    var likesCount = featuredPhotoElement.querySelector('.likes-count');
    var commentsCount = featuredPhotoElement.querySelector('.comments-count');
    var comments = renderComments(featuredPhoto.comments);

    img.src = featuredPhoto.url;
    description.textContent = featuredPhoto.comments[0];
    likesCount.textContent = featuredPhoto.likes;
    commentsCount.textContent = featuredPhoto.comments.length;

    window.utils.removeChildrens(commentsTemplateElement);
    commentsTemplateElement.appendChild(comments);

    return featuredPhoto;
  };

  var showFeaturedPhoto = function (photo) {
    renderFeaturedPhoto(photo);

    featuredPhotoCommentsElement.classList.add('visually-hidden');
    featuredPhotoLoadMoreElement.classList.add('visually-hidden');
    featuredPhotoElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    featuredPhotoCloseElement.addEventListener('click', popupCloseClickHandler);
    featuredPhotoCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);
    document.addEventListener('keydown', popupEscClickHandler);
  };

  var closeFeaturedPhoto = function () {
    featuredPhotoElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');

    featuredPhotoCloseElement.removeEventListener('click', popupCloseClickHandler);
    featuredPhotoCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);
    document.removeEventListener('keydown', popupEscClickHandler);
  };

  var popupCloseClickHandler = function () {
    closeFeaturedPhoto();
  };

  var popupEscClickHandler = function (evt) {
    window.utils.isEscEvent(evt, closeFeaturedPhoto);
  };

  var popupCloseKeyDownHandler = function (evt) {
    window.utils.isEnterEvent(evt, closeFeaturedPhoto);
  };

  window.preview = {
    show: showFeaturedPhoto,
    hide: closeFeaturedPhoto
  };

})();
