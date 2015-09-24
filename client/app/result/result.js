angular.module('spliced.result', [])

.controller('ResultController', function ($scope, Result) {
  // Your code here
  $scope.data = {};

  // this needs to have knowledge of whether or not the image is finished - so would use the services.js file 
  // $scope.isFinished = Result.finished();
})

