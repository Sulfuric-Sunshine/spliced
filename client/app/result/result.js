angular.module('spliced.result', [])

.controller('ResultController', function ($scope, Draw) {

  $scope.data = {};

  $scope.data.message = $scope.data.message || '';

  $scope.getFinalImage = function() {
    Draw.getFinalImage(function(finalImageURL) {
      $scope.data.finalImageURL = finalImageURL;
    }, function() {
      console.log("The image isn't there");
      $scope.data.message = "Looks like your collaborators are still drawing. Check back soon for your final drawing!";
    });
  }

  $scope.getFinalImage();
})

