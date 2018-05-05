'use strict';

(function () {

  /* Upload photo & edit form controls */
  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileElement = uploadFormElement.querySelector('#upload-file');

  var uploadedFileEditFormElement;
  var hashTagsInputElement;
  var uploadFormSubmitElement;
  var uploadFormCloseElement;
  var commentFieldElement;
  var errorMessageElement;

  var initDOMElements = function () {
    uploadedFileEditFormElement = uploadFormElement.querySelector('.img-upload__overlay');
    hashTagsInputElement = uploadFormElement.querySelector('.text__hashtags');
    uploadFormSubmitElement = document.querySelector('.img-upload__submit');
    uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
    commentFieldElement = uploadFormElement.querySelector('.text__description');
    errorMessageElement = uploadFormElement.querySelector('.img-upload__message--error');
  };

  var uploadFileChangeHandler = function () {
    initDOMElements();
    openEditForm();
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

  uploadFileElement.addEventListener('change', uploadFileChangeHandler);

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

  var openEditForm = function () {
    uploadedFileEditFormElement.classList.remove('hidden');
    uploadFormCloseElement.addEventListener('click', uploadFormCloseClickHandler);
    uploadFormCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);
    document.addEventListener('keydown', popupEscClickHandler);

    window.formFilter.init();
    window.formResize.init();
    window.notification.hideAll();

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

    window.formFilter.destroy();
    window.formResize.destroy();
    window.slider.destroy();
  };

})();
