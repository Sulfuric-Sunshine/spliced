angular.module('spliced.result', [])

.controller('ResultController', function ($scope, Draw) {
  // Your code here
  $scope.data = {};
  $scope.data.drawings = Draw.drawings;
  // this needs to have knowledge of whether or not the image is finished - so would use the services.js file 
  // $scope.isFinished = Result.finished();
  var imagesLoaded = 0;
  function displayImagesResult(){
    imagesLoaded += 1;
    if(imagesLoaded === 4)
  }


})

