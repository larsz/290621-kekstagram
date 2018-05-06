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

    hashtags.forEach(function (hashtag) {
      if (hashtag.indexOf('#') !== 0 && hashtag.length > 0) {
        validationErrors.push('Хэш-теги должны начинаться с символа #');
      } else if (hashtag.indexOf('#') !== hashtag.lastIndexOf('#')) {
        validationErrors.push('Хэш-теги должны разделяться пробелами.');
      } else if (hashtag.length > Hashtag.MAX) {
        validationErrors.push('Максимальная длина хэш-тега - ' + Hashtag.MAX + ' символов. ');
      } else if (hashtag.length < Hashtag.MIN) {
        validationErrors.push('Минимальная длина хэш-тега - ' + Hashtag.MIN + ' символа. ');
      } else if (validHashTags.indexOf(hashtag) !== -1) {
        validationErrors.push('Один и тот же хэш-тег не может быть использован дважды');
      } else {
        validHashTags.push(hashtag);
      }
    });

    if (validHashTags.length > Hashtag.LIMIT) {
      validationErrors.push('Нельзя указать больше пяти хэш-тегов');
    }

    if (validationErrors.length > 0) {
      var errorMessages = validationErrors.join(', ');
      showHashtagsValidationError(errorMessages);
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
