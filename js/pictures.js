'use strict';

var PhotoConsts = {
  COMMENTS: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  COMMENT_LIMITS: {
    MIN: 1,
    MAX: 2
  },
  AVATAR_LIMITS: {
    MIN: 1,
    MAX: 6
  },
  AVATAR_PATH: 'img/avatar-',
  AVATAR_EXT: '.svg',
  DESCRIPTIONS: [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ],
  LIKES: {
    MIN: 15,
    MAX: 200
  },
  PATH: 'photos/',
  PHOTO_EXT: '.jpg',
  QUANTITY: 25
};

var KeyCode = {
  ESC: 27,
  ENTER: 13
};

// common functions
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomIndex = function (arr) {
  return getRandomNumber(0, arr.length - 1);
};

var getRandomElement = function (arr) {
  return arr[getRandomIndex(arr)];
};

var insertFragment = function (parent, child) {
  parent.appendChild(child);
};

var removeChilds = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var isEscEvent = function (evt, action) {
  if (evt.keyCode === KeyCode.ESC) {
    action();
  }
};

var isEnterEvent = function (evt, action) {
  if (evt.keyCode === KeyCode.ENTER) {
    action();
  }
};

var getPhotoUrl = function (photoID) {
  var photoIndex = photoID + 1;

  if (photoIndex > PhotoConsts.QUANTITY) {
    photoIndex = photoID % PhotoConsts.QUANTITY + 1;
  }

  return PhotoConsts.PATH + photoIndex + PhotoConsts.PHOTO_EXT;
};

var getPhotoLikes = function () {
  return getRandomNumber(PhotoConsts.LIKES.MIN, PhotoConsts.LIKES.MAX);
};

var getPhotoDescription = function () {
  return getRandomElement(PhotoConsts.DESCRIPTIONS);
};

var getPhotoComments = function () {
  var comments = [];
  var commentsRandomLength = getRandomNumber(PhotoConsts.COMMENT_LIMITS.MIN, PhotoConsts.COMMENT_LIMITS.MAX);

  while (comments.length < commentsRandomLength) {
    var comment = getRandomElement(PhotoConsts.COMMENTS);
    if (comments.indexOf(comment) === -1) {
      comments.push(comment);
    }
  }

  return comments;
};

// Generate photos
var generateData = function (number) {
  var data = [];

  for (var i = 0, max = number; i < max; i++) {
    data.push({
      'url': getPhotoUrl(i),
      'likes': getPhotoLikes(),
      'comments': getPhotoComments(),
      'description': getPhotoDescription(),
      'photoID': i
    });
  }
  return data;
};

var generatedPhotos = generateData(PhotoConsts.QUANTITY);

// DOM elements
var photoTemplateElement = document.querySelector('#picture');
var photosListElement = document.querySelector('.pictures');

// Render thumbnails
var renderPhoto = function (photo) {
  var clonedPhotoTemplate = photoTemplateElement.content.cloneNode(true);
  var clonedPhoto = clonedPhotoTemplate.querySelector('.picture__link');
  var clonedPhotoImg = clonedPhoto.querySelector('.picture__img');
  var clonedPhotoLikes = clonedPhoto.querySelector('.picture__stat--likes');
  var clonedPhotoComments = clonedPhoto.querySelector('.picture__stat--comments');

  clonedPhoto.dataset.id = photo.photoID;
  clonedPhotoImg.src = photo.url;
  clonedPhotoLikes.textContent = photo.likes;
  clonedPhotoComments.textContent = photo.comments.length;

  return clonedPhoto;
};

// Save thumbnails fragment
var saveRenderedPhotos = function () {
  var photosFragment = document.createDocumentFragment();
  generatedPhotos.forEach(function (photo) {
    photosFragment.appendChild(renderPhoto(photo));
  });

  return photosFragment;
};

var renderedPhotos = saveRenderedPhotos();

var showThumbnails = function () {
  insertFragment(photosListElement, renderedPhotos);
};

showThumbnails();

// Featured photo elements
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
    avatar.src = PhotoConsts.AVATAR_PATH + getRandomNumber(PhotoConsts.AVATAR_LIMITS.MIN, PhotoConsts.AVATAR_LIMITS.MAX) + PhotoConsts.AVATAR_EXT;

    var commentText = newComment.firstChild;
    newComment.insertBefore(avatar, commentText);

    comments.appendChild(newComment);
  });

  return comments;
};

// Render featured photo
var renderFeaturedPhoto = function (featuredPhoto) {
  var img = featuredPhotoElement.querySelector('.big-picture__img img');
  var description = featuredPhotoElement.querySelector('.social__caption');
  var likesCount = featuredPhotoElement.querySelector('.likes-count');
  var commentsCount = featuredPhotoElement.querySelector('.comments-count');
  var comments = renderComments(featuredPhoto.comments);

  img.src = featuredPhoto.url;
  description.textContent = featuredPhoto.description;
  likesCount.textContent = featuredPhoto.likes;
  commentsCount.textContent = featuredPhoto.comments.length;

  removeChilds(commentsTemplateElement);
  insertFragment(commentsTemplateElement, comments);

  return featuredPhoto;
};

// Show featured photo
var showFeaturedPhoto = function (photo) {
  renderFeaturedPhoto(photo);

  featuredPhotoCommentsElement.classList.add('visually-hidden');
  featuredPhotoLoadMoreElement.classList.add('visually-hidden');
  featuredPhotoElement.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  featuredPhotoCloseElement.addEventListener('click', popupCloseClickHandler);
  featuredPhotoCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);
  document.addEventListener('keydown', popupEscClickHandler);
};

var closeFeaturedPhoto = function () {
  featuredPhotoElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  featuredPhotoCloseElement.removeEventListener('click', popupCloseClickHandler);
  featuredPhotoCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);
  document.removeEventListener('keydown', popupEscClickHandler);
};

var popupCloseClickHandler = function () {
  closeFeaturedPhoto();
};

// Handle click on thumb to show big photo
var thmbsListClickHandler = function (evt) {
  var clickedElement = evt.target;
  if (!clickedElement.dataset.id) {
    clickedElement = clickedElement.parentNode;
  }

  var clickedIndex = clickedElement.dataset.id;
  if (clickedIndex) {
    showFeaturedPhoto(generatedPhotos[clickedIndex]);
  }
};

photosListElement.addEventListener('click', thmbsListClickHandler, true);

var uploadFormElement = document.querySelector('.img-upload__form');
var uploadFileElement = uploadFormElement.querySelector('#upload-file');
var uploadedFileEditFormElement = uploadFormElement.querySelector('.img-upload__overlay');
var uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');

var uploadFileChangeHandler = function () {
  openEditForm();
};

uploadFileElement.addEventListener('change', uploadFileChangeHandler);

var openEditForm = function () {
  uploadedFileEditFormElement.classList.remove('hidden');
  uploadFormCloseElement.addEventListener('click', uploadFormCloseClickHandler);
  uploadFormCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);
  document.addEventListener('keydown', popupEscClickHandler);
};

var closeEditForm = function () {
  uploadedFileEditFormElement.classList.add('hidden');
  uploadFormCloseElement.removeEventListener('click', uploadFormCloseClickHandler);
  uploadFormCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);
  document.removeEventListener('keydown', popupEscClickHandler);
};

var uploadFormCloseClickHandler = function () {
  closeEditForm();
};

var popupEscClickHandler = function (evt) {
  isEscEvent(evt, closePopup);
};

var popupCloseKeyDownHandler = function (evt) {
  isEnterEvent(evt, closePopup);
};

var closePopup = function () {
  var isPhotoVisible = !featuredPhotoElement.classList.contains('hidden');
  var isFormVisible = !uploadedFileEditFormElement.classList.contains('hidden');

  if (isPhotoVisible) {
    closeFeaturedPhoto();
  }

  if (isFormVisible) {
    closeEditForm();
  }
};
