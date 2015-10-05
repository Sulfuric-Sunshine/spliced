angular.module('spliced.services', [])

.factory('Draw', function($http, $location) {
  var services = {};

  services.save = function(image, gameCode, cookieData) {
    console.log("Inside services, the image is", image);
    console.log("Inside services, the gameCode is", gameCode);
    console.log("Inside services, the cookieData is", cookieData);
    // write post request here! :)
    $http.post('/game/' + gameCode, { image: image, cookieData: cookieData } )
    .then(function(response) {
      console.log("The response is", response);
    }, function(err) {
      console.log("The error is", err)
    });
  };

  services.createGame = function(callback) {
    $http.get('/game')
    .then(function (gameCode) {
      callback(gameCode.data)
    }, function(err) {
      console.log('There was an error getting the game code.');
    });
  };

  services.registerPlayer = function(gameCode, callback){
    //POST request:
    console.log("Am I making a request?");
    $http.get('/game/' + gameCode )
    .then(function(response){
      var newUrl = '/game/' + gameCode + '/draw';
      $location.path(newUrl);
      console.log(newUrl);
      console.log(response);
    }), function(err){
      console.log("There was an error registering the player", err)
    }
  };

  services.getGameStatus = function(gameCode, callback) {
    console.log("Getting game data...");

    $http.get('/game/' + gameCode + '/status')
    .then(function(response){
      console.log("The game data is...", response);
      callback(response);
    }, function(err){
      console.log("The game doesn't exist", err);
      $location.path('/#')
    })
  };

  return services;
});

// Store all four images in an object 
// On the result page, you'll create a canvas that has four images on top of it
