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
  QUANTITY: 25,
  EFFECTS: {
    PREFIX_CLASS: 'effects__preview--',
    DEFAULT: 'none'
  },
  PREVIEW_CLASS: 'img-upload__preview'
};

var KeyCode = {
  ESC: 27,
  ENTER: 13,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};

var Resize = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

var Hashtag = {
  MIN: 2,
  MAX: 20,
  LIMIT: 5
};

// DOM elements
var photoTemplateElement = document.querySelector('#picture');
var photosListElement = document.querySelector('.pictures');

// Featured photo elements
var featuredPhotoElement = document.querySelector('.big-picture');
var featuredPhotoCommentsElement = featuredPhotoElement.querySelector('.social__comment-count');
var featuredPhotoLoadMoreElement = featuredPhotoElement.querySelector('.social__comment-loadmore');
var commentsTemplateElement = featuredPhotoElement.querySelector('.social__comments');
var featuredPhotoCloseElement = featuredPhotoElement.querySelector('.big-picture__cancel');

/* Upload photo & edit form controls */
var uploadFormElement = document.querySelector('.img-upload__form');
var uploadFileElement = uploadFormElement.querySelector('#upload-file');
var uploadedFileEditFormElement = uploadFormElement.querySelector('.img-upload__overlay');
var uploadFormSubmitElement = document.querySelector('.img-upload__submit');
var uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
var previewElement = uploadFormElement.querySelector('.img-upload__preview');
var hashTagsInputElement = uploadFormElement.querySelector('.text__hashtags');
var commentFieldElement = uploadFormElement.querySelector('.text__description');

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
      'description': getPhotoDescription()
    });
  }
  return data;
};

var generatedPhotos = generateData(PhotoConsts.QUANTITY);

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
    showFeaturedPhoto(photo);
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
  commentsTemplateElement.appendChild(comments);

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

/* ----------------- Effects & Slider  ----------------- */
var sliderElement = uploadedFileEditFormElement.querySelector('.img-upload__scale');
var sliderPinElement = uploadedFileEditFormElement.querySelector('.scale__pin');
var effectsElement = uploadedFileEditFormElement.querySelector('.effects');
var effectInputElement = uploadedFileEditFormElement.querySelectorAll('.effects__radio');

var effectLevelLineElement = uploadedFileEditFormElement.querySelector('.scale__line');
var effectLevelInputElement = uploadedFileEditFormElement.querySelector('.scale__value');
var scaleLevelElement = effectLevelLineElement.querySelector('.scale__level');

sliderElement.classList.add('hidden');

var sliderPinMouseDownHandler = function (evt) {
  evt.preventDefault();

  var startX = evt.clientX;

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;

    var actualPinPosition = sliderPinElement.offsetLeft - shift;

    updateSlider(actualPinPosition);
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);

};

var sliderPinKeyDownHandler = function (evt) {
  var shift = sliderPinElement.offsetLeft;

  if (evt.keyCode === KeyCode.ARROW_LEFT) {
    shift -= 2;
    updateSlider(shift);
  } else if (evt.keyCode === KeyCode.ARROW_RIGHT) {
    shift += 2;
    updateSlider(shift);
  }
};

var updateSlider = function (pinPosition) {
  var intensityLevel = ((pinPosition / effectLevelLineElement.offsetWidth) * 100).toFixed(2);

  if (intensityLevel > 0 && intensityLevel < 100) {
    sliderPinElement.style.left = intensityLevel + '%';
    scaleLevelElement.style.width = intensityLevel + '%';
    effectLevelInputElement.value = intensityLevel;
  }

  applyFilter(intensityLevel);
};

var toogleSlider = function (isHidden) {
  if (isHidden) {
    sliderElement.classList.add('hidden');
  } else {
    sliderElement.classList.remove('hidden');
  }
};

var getCurrentFilter = function () {
  var currentFilter;
  for (var i = 0, max = effectInputElement.length; i < max; i++) {
    if (effectInputElement[i].checked) {
      currentFilter = effectInputElement[i].value;
      break;
    }
  }

  return currentFilter;
};

var setCurrentFilter = function (evt) {
  var clickedFilter = evt.target;
  var clickedFilterName = clickedFilter.id.split('-').pop();
  var isSliderHidden = clickedFilterName.includes('none');

  toogleSlider(isSliderHidden);
  previewElement.removeAttribute('style');

  previewElement.className = PhotoConsts.PREVIEW_CLASS + ' ' + PhotoConsts.EFFECTS.PREFIX_CLASS + clickedFilterName;
  sliderPinElement.style.left = 100 + '%';
  scaleLevelElement.style.width = 100 + '%';
  resizeValueElement.value = 100 + '%';
};

var applyFilter = function (intensity) {
  var selectedFilter = getCurrentFilter();
  var appliedEffectClassName = PhotoConsts.EFFECTS.PREFIX_CLASS + selectedFilter;
  previewElement.className = PhotoConsts.PREVIEW_CLASS + ' ' + appliedEffectClassName;

  sliderElement.classList.remove('hidden');
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

var effectLevelLineClickHandler = function (clickedEvt) {
  if (!clickedEvt.target.classList.contains('scale__pin')) {
    updateSlider(clickedEvt.offsetX);
  }
};

effectsElement.addEventListener('change', setCurrentFilter);
effectLevelLineElement.addEventListener('click', effectLevelLineClickHandler);

/* ----------------- Open & Close edit form ----------------- */

var uploadFileChangeHandler = function () {
  openEditForm();
};

var openEditForm = function () {
  uploadedFileEditFormElement.classList.remove('hidden');
  uploadFormCloseElement.addEventListener('click', uploadFormCloseClickHandler);
  uploadFormCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);
  document.addEventListener('keydown', popupEscClickHandler);

  sliderPinElement.addEventListener('mousedown', sliderPinMouseDownHandler, false);
  sliderPinElement.addEventListener('keydown', sliderPinKeyDownHandler);
};

var closeEditForm = function () {
  uploadFileElement.value = '';
  hashTagsInputElement.value = '';
  commentFieldElement.value = '';

  uploadedFileEditFormElement.classList.add('hidden');
  uploadFormCloseElement.removeEventListener('click', uploadFormCloseClickHandler);
  uploadFormCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);
  document.removeEventListener('keydown', popupEscClickHandler);

  sliderPinElement.removeEventListener('mousedown', sliderPinMouseDownHandler, false);
  sliderPinElement.removeEventListener('keydown', sliderPinKeyDownHandler);
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

uploadFileElement.addEventListener('change', uploadFileChangeHandler);

/* ----------------- Resize control ----------------- */
var resizePlusElement = uploadFormElement.querySelector('.resize__control--plus');
var resizeMinusElement = uploadFormElement.querySelector('.resize__control--minus');
var resizeValueElement = uploadFormElement.querySelector('.resize__control--value');

var resizeMinusClickHandler = function () {
  var resizeVal = Math.min(Resize.MAX, Math.max(Resize.MIN, parseInt(resizeValueElement.value, 10) - Resize.STEP));
  resizeValueElement.value = resizeVal + '%';
  previewElement.style.transform = 'scale(' + resizeVal / 100 + ')';
};

var resizePlusClickHandler = function () {
  var resizeVal = Math.min(Resize.MAX, Math.max(Resize.MIN, parseInt(resizeValueElement.value, 10) + Resize.STEP));
  resizeValueElement.value = resizeVal + '%';
  previewElement.style.transform = 'scale(' + resizeVal / 100 + ')';
};

resizeMinusElement.addEventListener('click', resizeMinusClickHandler);
resizePlusElement.addEventListener('click', resizePlusClickHandler);

/* ----------------- Hashtags & form validation ----------------- */
var showHashtagsValidationError = function (message) {
  hashTagsInputElement.setCustomValidity(message);
  hashTagsInputElement.style.borderColor = 'red';
};

var clearHashtagsValidationError = function () {
  hashTagsInputElement.setCustomValidity('');
  hashTagsInputElement.style.borderColor = 'initial';
};

var checkHashtagsValidity = function () {
  var data = hashTagsInputElement.value.toLowerCase();

  if (data === '') {
    clearHashtagsValidationError();
    return true;
  }

  var hashtags = data.split(' ');
  var validHashTags = [];
  var validationErrors = [];
  var isValid = false;

  for (var i = 0, max = hashtags.length; i < max; i++) {
    if (hashtags[i].indexOf('#') !== 0 && hashtags[i].length > 0) {
      validationErrors.push('Хэш-теги должны начинаться с символа #');
      break;
    } else if (hashtags[i].indexOf('#') !== hashtags[i].lastIndexOf('#')) {
      validationErrors.push('Хэш-теги должны разделяться пробелами.');
      break;
    } else if (hashtags[i].length > Hashtag.MAX) {
      validationErrors.push('Максимальная длина хэш-тега - ' + Hashtag.MAX + ' символов. ');
      break;
    } else if (hashtags[i].length < Hashtag.MIN) {
      validationErrors.push('Минимальная длина хэш-тега - ' + Hashtag.MIN + ' символа. ');
      break;
    } else if (validHashTags.indexOf(hashtags[i]) !== -1) {
      validationErrors.push('Один и тот же хэш-тег не может быть использован дважды');
      break;
    } else {
      validHashTags.push(hashtags[i]);
    }
  }

  if (validHashTags.length > Hashtag.LIMIT) {
    validationErrors.push('Нельзя указать больше пяти хэш-тегов');
  }

  if (validationErrors.length > 0) {
    validationErrors.forEach(function (error) {
      showHashtagsValidationError(error);
    });
  } else {
    clearHashtagsValidationError();
    isValid = true;
  }

  return isValid;
};

uploadFormSubmitElement.addEventListener('click', checkHashtagsValidity);

hashTagsInputElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', popupEscClickHandler);
});

hashTagsInputElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', popupEscClickHandler);
});

commentFieldElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', popupEscClickHandler);
});

commentFieldElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', popupEscClickHandler);
});

