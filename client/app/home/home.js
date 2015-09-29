angular.module('spliced.home', [])

.controller('HomeController', function ($scope, Draw) {

  $scope.data = {};

  $scope.data.pleaseWaitMessage = 'Looks like your collaborators are still drawing. Check back soon for your final drawing!';

  $scope.createGame = function() {
    Draw.createGame(function(code) {
      console.log(code);
    });
  }

})