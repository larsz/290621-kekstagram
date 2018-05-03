'use strict';

(function () {

  /* Upload photo & edit form controls */
  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileElement = uploadFormElement.querySelector('#upload-file');
  var uploadedFileEditFormElement = uploadFormElement.querySelector('.img-upload__overlay');
  var hashTagsInputElement = uploadFormElement.querySelector('.text__hashtags');
  var uploadFormSubmitElement = document.querySelector('.img-upload__submit');
  var uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
  var commentFieldElement = uploadFormElement.querySelector('.text__description');
  var errorMessageElement = uploadFormElement.querySelector('.img-upload__message--error');

  var uploadFileChangeHandler = function () {
    openEditForm();
  };

  var openEditForm = function () {
    uploadedFileEditFormElement.classList.remove('hidden');
    uploadFormCloseElement.addEventListener('click', uploadFormCloseClickHandler);
    uploadFormCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);
    document.addEventListener('keydown', popupEscClickHandler);

    window.formResize.init();
    window.notification.hideAll();
  };

  var closeEditForm = function () {
    uploadFileElement.value = '';
    hashTagsInputElement.value = '';
    commentFieldElement.value = '';
    hideFormError();

    uploadedFileEditFormElement.classList.add('hidden');
    uploadFormCloseElement.removeEventListener('click', uploadFormCloseClickHandler);
    uploadFormCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);
    document.removeEventListener('keydown', popupEscClickHandler);

    window.formResize.destroy();
  };

  var uploadFormCloseClickHandler = function () {
    closeEditForm();
  };

  var popupEscClickHandler = function (evt) {
    window.utils.isEscEvent(evt, closeEditForm);
  };

  var popupCloseKeyDownHandler = function (evt) {
    window.utils.isEnterEvent(evt, closeEditForm);
  };

  var showFormError = function (message) {
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove('hidden');
  };

  var hideFormError = function () {
    window.utils.removeChilds(errorMessageElement);
    errorMessageElement.classList.add('hidden');
  };

  var submitFormSuccessHandler = function () {
    hideFormError();
    window.notification.showInfo();
    closeEditForm();
  };

  var submitFormErrorHandler = function (errorMessage) {
    showFormError(errorMessage);
  };

  uploadFileElement.addEventListener('change', uploadFileChangeHandler);

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

  uploadFormSubmitElement.addEventListener('click', window.formValidate.checkHashTags);

  uploadFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(uploadFormElement);
    window.backend.save(formData, submitFormSuccessHandler, submitFormErrorHandler);
  });

})();
