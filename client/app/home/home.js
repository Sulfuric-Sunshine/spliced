angular.module('spliced.home', [])

.controller('HomeController', function ($scope, Draw, $location) {

  $scope.createGame = function() {
    Draw.createGame(function(code) {
      console.log(code);
      $location.path('/game/' + code);
    });
  }

  $scope.enterCode = function(gameCode) {
    var newUrl = '/game/' + gameCode;
    $location.path(newUrl);
  }

})