angular.module('spliced.draw', [])

.controller('DrawController', function ($scope, $route, Draw) {
  // drawing info will go here.
  $scope.data = {};

  $scope.data.drawing = {};
  $scope.data.playerId = $route.current.params.playerId;
  $scope.data.drawing.version = 0;
  $scope.data.submitted = $scope.data.submitted || false;

  $scope.data.success = "Success! Your image has been submitted!"
  
  // $scope.data.image = // ng-model for the canvas itself, which we'll save

  $scope.save = function() { 
    var image = document.getElementById("pwCanvasMain").toDataURL();  
    Draw.save(image, $scope.data.playerId);
    $scope.data.submitted = true;
    // send the image to the server.
  };

  $scope.undo = function() { 
    $scope.data.drawing.version--;
  } 

});
