angular.module('spliced.services', [])

.factory('Draw', function($http) {
  var services = {};

  services.getFinalImage = function(callback, errorCallback) {
    // TODO: might change this later
    $http.get('/finalresult')
    .then(function(finalImageURL) { 
      callback(finalImageURL.data)
    }, function(err) {
      console.log("There was an error retrieving the final image URL.");
      errorCallback(err);
    });
  };

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
      console.log(response);
    }), function(err){
      console.log("There was an error registering the player", err)
    }
  };

  services.getGameStatus = function(gameCode, callback) {
    console.log("Getting game data...");
    $http.get('/game/' + gameCode )
    .then(function(response){
      console.log("The game data is...", response);
      callback(response);
    }), function(err){
      console.log("There was an error registering the player", err)
    }  
  };

  return services;
});

// Store all four images in an object 
// On the result page, you'll create a canvas that has four images on top of it
