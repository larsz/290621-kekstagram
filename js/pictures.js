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
  QUANTITY: 25,
  FEATURED_PHOTO_DEFAULT_CLASS: 'hidden'
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

var getPhotoUrl = function (photoID) {
  var photoIndex = photoID + 1;

  if (photoIndex > PhotoConsts.QUANTITY) {
    photoIndex = photoID % PhotoConsts.QUANTITY + 1;
  }

  return PhotoConsts.PATH + photoIndex + '.jpg';
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
      'description': getPhotoDescription()
    });
  }
  return data;
};

var generatedPhotos = generateData(PhotoConsts.QUANTITY);

// DOM elements
var photoTemplateElement = document.querySelector('#picture');
var photoContainerElement = document.querySelector('.pictures');

var renderPhoto = function (photo) {
  var clonedPhoto = photoTemplateElement.content.cloneNode(true);
  var clonedPhotoImg = clonedPhoto.querySelector('.picture__img');
  var clonedPhotoLikes = clonedPhoto.querySelector('.picture__stat--likes');
  var clonedPhotoComments = clonedPhoto.querySelector('.picture__stat--comments');

  clonedPhotoImg.src = photo.url;
  clonedPhotoLikes.textContent = photo.likes;
  clonedPhotoComments.textContent = photo.comments.length;

  return clonedPhoto;
};

var saveRenderedPhotos = function () {
  var photosFragment = document.createDocumentFragment();
  generatedPhotos.forEach(function (photo) {
    photosFragment.appendChild(renderPhoto(photo));
  });

  return photosFragment;
};

var renderedPhotos = saveRenderedPhotos();

var insertFragment = function (parent, child) {
  parent.appendChild(child);
};

insertFragment(photoContainerElement, renderedPhotos);

var featuredPhotoElement = document.querySelector('.big-picture');
var featuredPhotoCommentsElement = featuredPhotoElement.querySelector('.social__comment-count');
var featuredPhotoLoadMoreElement = featuredPhotoElement.querySelector('.social__comment-loadmore');
var commentsTemplateElement = featuredPhotoElement.querySelector('.social__comments');

var hideDefaultSettings = function () {
  while (commentsTemplateElement.firstChild) {
    commentsTemplateElement.removeChild(commentsTemplateElement.firstChild);
  }

  featuredPhotoCommentsElement.classList.add('visually-hidden');
  featuredPhotoLoadMoreElement.classList.add('visually-hidden');
};

var renderComments = function (data) {
  var comments = document.createDocumentFragment();

  data.forEach(function (item) {
    var newComment = commentsTemplateElement.querySelector('.social__comment').cloneNode(true);
    var avatar = newComment.querySelector('.social__picture');

    newComment.textContent = item;
    avatar.src = PhotoConsts.AVATAR_PATH + getRandomNumber(PhotoConsts.AVATAR_LIMITS.MIN, PhotoConsts.AVATAR_LIMITS.MAX) + '.svg';

    var commentText = newComment.firstChild;
    newComment.insertBefore(avatar, commentText);

    comments.appendChild(newComment);
  });

  return comments;
};

var renderFeaturedPhoto = function (featuredPhoto) {
  var img = featuredPhotoElement.querySelector('.big-picture__img img');
  var likesCount = featuredPhotoElement.querySelector('.likes-count');
  var commentsCount = featuredPhotoElement.querySelector('.comments-count');
  var comments = renderComments(featuredPhoto.comments);

  img.src = featuredPhoto.url;
  likesCount.textContent = featuredPhoto.likes;
  commentsCount.textContent = featuredPhoto.comments.length;

  hideDefaultSettings();
  insertFragment(commentsTemplateElement, comments);

  return featuredPhoto;
};

var initFeaturedPhoto = function () {
  var randomFeaturedPhoto = getRandomElement(generatedPhotos);
  renderFeaturedPhoto(randomFeaturedPhoto);

  featuredPhotoElement.classList.remove(PhotoConsts.FEATURED_PHOTO_DEFAULT_CLASS);
};

initFeaturedPhoto();

