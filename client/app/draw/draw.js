angular.module('spliced.draw', [])

.controller('DrawController', function ($scope, $route, Draw, $location, $cookies) {
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
    Draw.save(image, $scope.gameCode, $cookies.getAll());
    $scope.data.submitted = true;
    // send the image to the server.
  };

  $scope.undo = function() { 
    $scope.data.drawing.version--;
  } 

 $scope.gameCode = $route.current.params.code;
  // console.log($route.current.params.code);

  $scope.registerPlayer = function(){

      Draw.registerPlayer($scope.gameCode);
  }

  var player = $cookies.get("player");
  console.log(player);

});
