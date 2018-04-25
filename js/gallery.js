'use strict';

(function () {
  var PHOTOS_QUANTITY = 25;

  var generatedPhotos = window.data.generateData(PHOTOS_QUANTITY);

  window.gallery = {
    generatedPhotos: generatedPhotos
  };

})();
