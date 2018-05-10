'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileElement = uploadFormElement.querySelector('#upload-file');

  var previewElement;
  var effectsPreviewsElement;
  var uploadedFileEditFormElement;
  var hashTagsInputElement;
  var uploadFormSubmitElement;
  var uploadFormCloseElement;
  var commentFieldElement;
  var errorMessageElement;

  var initDOMElements = function () {
    uploadedFileEditFormElement = uploadFormElement.querySelector('.img-upload__overlay');
    previewElement = uploadedFileEditFormElement.querySelector('.img-upload__preview img');
    hashTagsInputElement = uploadFormElement.querySelector('.text__hashtags');
    uploadFormSubmitElement = document.querySelector('.img-upload__submit');
    uploadFormCloseElement = uploadFormElement.querySelector('.img-upload__cancel');
    commentFieldElement = uploadFormElement.querySelector('.text__description');
    errorMessageElement = uploadFormElement.querySelector('.img-upload__message--error');
    effectsPreviewsElement = uploadedFileEditFormElement.querySelectorAll('.effects__preview');
  };

  var showFormError = function (message) {
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove('hidden');
  };

  var hideFormError = function () {
    window.utils.removeChilds(errorMessageElement);
    errorMessageElement.classList.add('hidden');
  };

  var uploadUserImage = function () {
    var uploadedFile = uploadFileElement.files[0];
    var uploadedFileName = uploadedFile.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return uploadedFileName.endsWith(it);
    });

    if (!matches) {
      showFormError('Неверный формат файла');
      return false;
    }

    previewElement.src = '';

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      previewElement.src = reader.result;

      effectsPreviewsElement.forEach(function (effect) {
        effect.style.backgroundImage = 'url(' + reader.result + ')';
      });

    });

    reader.readAsDataURL(uploadedFile);
    openEditForm();

    return true;
  };

  var uploadFileChangeHandler = function () {
    initDOMElements();
    uploadUserImage();
  };

  var uploadFormCloseClickHandler = function () {
    closeEditForm();
  };

  uploadFileElement.addEventListener('change', uploadFileChangeHandler);

  var popupEscClickHandler = function (evt) {
    window.utils.isEscEvent(evt, closeEditForm);
  };

  var popupCloseKeyDownHandler = function (evt) {
    window.utils.isEnterEvent(evt, closeEditForm);
  };

  var hashTagsInputFocusInHandler = function () {
    document.removeEventListener('keydown', popupEscClickHandler);
  };

  var hashTagsInputFocusOutHandler = function () {
    document.addEventListener('keydown', popupEscClickHandler);
  };

  var commentFieldFocusInHandler = function () {
    document.removeEventListener('keydown', popupEscClickHandler);
  };

  var commentFieldFocusOutHandler = function () {
    document.addEventListener('keydown', popupEscClickHandler);
  };

  var setupFormSpecificEvents = function () {
    uploadFormCloseElement.addEventListener('click', uploadFormCloseClickHandler);
    uploadFormCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);
    document.addEventListener('keydown', popupEscClickHandler);

    hashTagsInputElement.addEventListener('focusin', hashTagsInputFocusInHandler);
    hashTagsInputElement.addEventListener('focusout', hashTagsInputFocusOutHandler);
    commentFieldElement.addEventListener('focusin', commentFieldFocusInHandler);
    commentFieldElement.addEventListener('focusout', commentFieldFocusOutHandler);

    uploadFormSubmitElement.addEventListener('click', window.formValidate.checkHashTags);
    uploadFormElement.addEventListener('submit', uploadFormSubmitHandler);
  };

  var destroyFormSpecificEvents = function () {
    uploadFormCloseElement.removeEventListener('click', uploadFormCloseClickHandler);
    uploadFormCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);
    document.removeEventListener('keydown', popupEscClickHandler);

    hashTagsInputElement.removeEventListener('focusin', hashTagsInputFocusInHandler);
    hashTagsInputElement.removeEventListener('focusout', hashTagsInputFocusOutHandler);
    commentFieldElement.removeEventListener('focusin', commentFieldFocusInHandler);
    commentFieldElement.removeEventListener('focusout', commentFieldFocusOutHandler);

    uploadFormSubmitElement.removeEventListener('click', window.formValidate.checkHashTags);
    uploadFormElement.removeEventListener('submit', uploadFormSubmitHandler);
  };

  var submitFormSuccessHandler = function () {
    hideFormError();
    window.notification.showInfo();
    closeEditForm();
  };

  var submitFormErrorHandler = function (errorMessage) {
    showFormError(errorMessage);
  };

  var uploadFormSubmitHandler = function (evt) {
    evt.preventDefault();
    var formData = new FormData(uploadFormElement);
    window.backend.save(formData, submitFormSuccessHandler, submitFormErrorHandler);
  };

  var openEditForm = function () {
    uploadedFileEditFormElement.classList.remove('hidden');

    setupFormSpecificEvents();

    window.formFilter.init();
    window.formResize.init();
    window.notification.hideAll();
  };

  var closeEditForm = function () {
    uploadFormElement.reset();
    uploadFileElement.value = '';
    hashTagsInputElement.value = '';
    commentFieldElement.value = '';
    previewElement.src = '';

    hideFormError();
    window.formValidate.resetErrors();
    destroyFormSpecificEvents();

    uploadedFileEditFormElement.classList.add('hidden');

    window.formFilter.destroy();
    window.formResize.destroy();
    window.slider.destroy();
  };

})();
