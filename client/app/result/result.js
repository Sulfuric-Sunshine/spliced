angular.module('spliced.result', [])

.controller('ResultController', function ($scope, Draw) {

  $scope.data = {};

  $scope.data.finalImageURL = $scope.data.finalImageURL || '';

  $scope.data.finalImageExists = false; 

  $scope.getFinalImage = function() {
    Draw.getFinalImage(function(finalImageURL) {
      $scope.data.finalImageURL = finalImageURL;
      $scope.data.finalImageExists = true; 
    }, function() {
      $scope.data.finalImageExists = false;
    });
  }

  $scope.getFinalImage();
})

