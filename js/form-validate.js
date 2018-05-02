'use strict';

(function () {

  var Hashtag = {
    MIN: 2,
    MAX: 20,
    LIMIT: 5
  };

  var hashTagsInputElement = document.querySelector('.text__hashtags');

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

  window.formValidate = {
    checkHashTags: checkHashtagsValidity
  };

})();
