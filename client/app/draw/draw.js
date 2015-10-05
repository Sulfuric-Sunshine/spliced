angular.module('spliced.draw', [])

.controller('DrawController', function ($scope, $route, Draw, $q, $location, $cookies) {
  // drawing info will go here.
  $scope.data = {};

  $scope.data.drawing = {};

  // This drawing.version counter is for the Undo button that comes with the angular canvas painting directive.
  // DON'T DELETE IT or the Undo button will break! 

  $scope.data.drawing.version = 0;

  $scope.undo = function() { 
    $scope.data.drawing.version--;
  } 

  // If the image has been submitted, we'll show the user a success message

  $scope.data.submitted = $scope.data.submitted || false;
  $scope.data.success = "Success! Your image has been submitted!"

  // This grabs the game code, generated at the home screen, and passes it into our save function.

  $scope.data.gameCode = $route.current.params.code;

  // On the server side, we sent a randomly generated template ID to the user in a cookie. This template
  // ID will give them one of several sets of templates with pre-drawn dots. It'll also assign which part
  // of the body the user should be drawing (i.e. head, body1, body2, feet), based on their userID, which
  // was sent back in a cookie. The userID is 0, 1, 2, or 3, depending on who hit the server first. It's a
  // first-come first-served dealio. 

  var templateId = $cookies.get('templateId');
  $scope.data.userId = $cookies.get($scope.data.gameCode + '_playerName');

  // all templates are stored inside assets/bg/. Feel free to add more! :) 

  $scope.data.templateSrc = '/assets/bg/' + templateId + '-' + $scope.data.userId + '.png';

  // We need this so we can tell the user which part of the drawing they're using. Check out {{ data.bodyPart[data.userId] }}. 
  $scope.data.bodyPart = {
    0: "head",
    1: "chest/upper torso",
    2: "lower body/legs",
    3: "feet"
  };

  // This function grabs the canvas HTML element and turns it into a base64 encoded image -- that's what
  // `toDataURL() does`. Then it asks the Draw service to take the drawing, as well as the game code and cookie data
  // (just for kicks). Finally, on clicking save, the $scope.data.submitted property is set to true, which triggers
  // the success message.

  $scope.save = function() {
    var image = document.getElementById("pwCanvasMain").toDataURL();
    Draw.save(image, $scope.data.gameCode, $cookies.getAll());
    $scope.data.submitted = true;
    // send the image to the server.
  };

  $scope.getGameStatus = function() {
    console.log("Getting the game status for", $scope.data.gameCode);
    Draw.getGameStatus($scope.data.gameCode, function(response) {
      console.log("The game status response is...", response);
      // if the game has the property imageURL
      if (response.data.hasOwnProperty("imageURL")) {
        // direct user to /result page

      }
      var submittedDrawing = $scope.data.gameCode + '_submitted_drawing';
      if (response.data[submittedDrawing]) {
        console.log("You submitted a drawing!!!!");
        console.log("Forwarding you to /#/game/:code/status");
        var newLocation = '/game/' + $scope.data.gameCode + '/status';
        $location.path(newLocation);
      }
    });
  };



});
