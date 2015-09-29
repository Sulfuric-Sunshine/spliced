angular.module('spliced.result', [])

.controller('ResultController', function ($scope, Draw) {

  $scope.data = {};

  $scope.data.pleaseWaitMessage = 'Looks like your collaborators are still drawing. Check back soon for your final drawing!';

  $scope.getFinalImage = function() {
    Draw.getFinalImage(function(finalImageURL) {
      $scope.data.finalImageURL = finalImageURL;
    });
  }

  $scope.getFinalImage();
})

