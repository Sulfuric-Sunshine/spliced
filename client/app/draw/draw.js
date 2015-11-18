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
  };

  // If the image has been submitted, we'll show the user a success message

  $scope.data.submitted = $scope.data.submitted || false;
  $scope.data.success = "Success! Your image has been submitted!";

  // This grabs the game code, generated at the home screen, and passes it into our save function. It also grabs the current
  // player count and sets the canvas size and helpful text accordingly.

  $scope.data.gameCode = $route.current.params.code;
  $scope.data.playerCount = Draw.getCount($scope.data.gameCode);
  if($scope.data.playerCount === 2){
    $scope.data.height = 400;
    $scope.data.bodyPart = {
      0: "upper body",
      1: "lower body"
    };
    $scope.data.instructions = {
      0: "Use the black markers to connect your upper body to the lower body!",
      1: "Connect the lower body to the upper body using the black markers!"
    };
  } else {
    $scope.data.height = 200;
    $scope.data.bodyPart = {
      0: "head",
      1: "arms/chest/upper torso",
      2: "lower body/legs",
      3: "feet"
    };
    $scope.data.instructions = {
      0: "Make a neck that ends where the black markers start so your friend can connect the torso",
      1: "Connect the arms/torso to the base of the neck where the black markers at the top begin. Don't forget to leave some room for your friend to connect the legs where the black markers at the bottom start",
      2: "Connect the legs to the base of the arms/torso where the black markers at the top begin. Don't forget to leave room for your friend drawing the feet where the black markers start at the bottom start",
      3: "Connect the feet to the base of the legs where the black markers start"
    };
  }


  $scope.data.width = 400;



  // On the server side, we sent a randomly generated template ID to the user in a cookie. This template
  // ID will give them one of several sets of templates with pre-drawn dots. It'll also assign which part
  // of the body the user should be drawing (i.e. head, body1, body2, feet), based on their userID, which
  // was sent back in a cookie. The userID is 0, 1, 2, or 3, depending on who hit the server first. It's a
  // first-come first-served dealio. 

  var templateId = $cookies.get('templateId');
  $scope.data.userId = $cookies.get($scope.data.gameCode + '_playerName');

  // all templates are stored inside assets/bg/. Feel free to add more! :) 

  $scope.data.templateSrc = '/assets/bg/' + templateId + '-' + $scope.data.userId + '.png';


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
