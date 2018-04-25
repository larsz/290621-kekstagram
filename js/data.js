'use strict';

(function () {

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

  var getPhotoUrl = function (photoID) {
    var photoIndex = photoID + 1;

    if (photoIndex > PhotoConsts.QUANTITY) {
      photoIndex = photoID % PhotoConsts.QUANTITY + 1;
    }

    return PhotoConsts.PATH + photoIndex + PhotoConsts.PHOTO_EXT;
  };

  var getPhotoLikes = function () {
    return window.utils.getRandomNumber(PhotoConsts.LIKES.MIN, PhotoConsts.LIKES.MAX);
  };

  var getPhotoDescription = function () {
    return window.utils.getRandomElement(PhotoConsts.DESCRIPTIONS);
  };

  var getPhotoComments = function () {
    var comments = [];
    var commentsRandomLength = window.utils.getRandomNumber(PhotoConsts.COMMENT_LIMITS.MIN, PhotoConsts.COMMENT_LIMITS.MAX);

    while (comments.length < commentsRandomLength) {
      var comment = window.utils.getRandomElement(PhotoConsts.COMMENTS);
      if (comments.indexOf(comment) === -1) {
        comments.push(comment);
      }
    }

    return comments;
  };

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

  window.data = {
    generateData: generateData
  };

})();
