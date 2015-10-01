angular.module('spliced.draw', [])

.controller('DrawController', function ($scope, $route, Draw, $q, $location, $cookies) {
  // drawing info will go here.
  $scope.data = {};

  $scope.data.drawing = {};
  $scope.data.drawing.version = 0;
  $scope.data.submitted = $scope.data.submitted || false;

  $scope.data.success = "Success! Your image has been submitted!"

  $scope.data.gameCode = $route.current.params.code;
  var templateId = $cookies.get('templateId');
  $scope.data.userId = $cookies.get($scope.data.gameCode + '_playerName');
  $scope.data.templateSrc = '/assets/bg/' + templateId + '-' + $scope.data.userId + '.png';

  $scope.data.bodyPart = {
    0: "head",
    1: "chest/upper torso",
    2: "lower body/legs",
    3: "feet"
  }


  $scope.save = function() { 
    var image = document.getElementById("pwCanvasMain").toDataURL();  
    Draw.save(image, $scope.data.gameCode, $cookies.getAll());
    $scope.data.submitted = true;
    // send the image to the server.
  };

  $scope.undo = function() { 
    $scope.data.drawing.version--;
  } 

});
