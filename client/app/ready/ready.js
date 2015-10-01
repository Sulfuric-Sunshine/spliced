angular.module('spliced.ready', [])

.controller('ReadyController', function ($scope, $route, Draw, $location, $cookies) {

  $scope.data = {};
  $scope.data.isComplete = $scope.data.isComplete || false;
  $scope.data.imageURL = $scope.data.imageURL || null;
  // console.log($route.current.params.code);
  $scope.data.gameCode = $route.current.params.code;

  $scope.data.gameURL = window.location.href;
  // $scope.data.image = // ng-model for the canvas itself, which we'll save

  // this asks the server for info about the game. 
  $scope.getGameStatus = function() {
    
    Draw.getGameStatus($scope.data.gameCode, function(response) {
      console.log("The game status response is...", response);
      // if the game has the property imageURL
      if (response.data.hasOwnProperty("imageURL")) {
        // then we know that the game is complete, and we set that property to true
        $scope.data.isComplete = true;
        // and we set the $scope's image URL to the imageURL from the response.
        $scope.data.imageURL = response.data.imageURL;
      } 
    });
  }

  // this invokes getGameStatus when the page is loaded.
  $scope.getGameStatus();

});