angular.module('spliced.draw', [])

.controller('DrawController', function ($scope, $route, Draw) {
  // drawing info will go here.
  $scope.data = {};


  $scope.data.drawing;
  $scope.data.playerId = $route.current.params.playerId;

  // $scope.data.image = // ng-model for the canvas itself, which we'll save

  $scope.save = function() { 
    var image = document.getElementById("pwCanvasMain").toDataURL();  
    Draw.save(image, $scope.data.playerId);
    // send the image to the server.
  } 

});
