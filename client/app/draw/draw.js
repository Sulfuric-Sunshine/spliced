angular.module('spliced.draw', [])

.controller('DrawController', function ($scope, $location, Result) {
  // drawing info will go here.
  $scope.data = {};


  $scope.data.drawing;
  $scope.data.playerId = $location.path();

  // $scope.data.image = // ng-model for the canvas itself, which we'll save

  $scope.save = function() { 
    var image = document.getElementById("pwCanvasMain").toDataURL();  

    Result.save(image);
    // send the image to the server.
    console.log(image);
    console.log($scope.data.playerId);
  } 

});
