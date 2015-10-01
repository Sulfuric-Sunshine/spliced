angular.module('spliced.ready', [])

.controller('ReadyController', function ($scope, $route, Draw, $location, $cookies) {

  $scope.data = {};
  $scope.data.isComplete = $scope.data.isComplete || false;
  $scope.data.imageURL = $scope.data.imageURL || null;
  // console.log($route.current.params.code);
  $scope.data.gameCode = $route.current.params.code;

  $scope.data.gameURL = window.location.href;
  // $scope.data.image = // ng-model for the canvas itself, which we'll save


  $scope.getGameStatus = function() {
    Draw.getGameStatus($scope.data.gameCode, function(response) {
      console.log("The game status response is...", response);
      if (response.data.hasOwnProperty("imageURL")) {
        $scope.data.isComplete = true;
        $scope.data.imageURL = response.data.imageURL;
      }
    });
  }
  $scope.getGameStatus();

});