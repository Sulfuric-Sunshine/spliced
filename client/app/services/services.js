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

  services.save = function(image, playerId) {
    console.log("Inside services, the image is", image);
    console.log("Inside services, the playerId is", playerId);
    // write post request here! :)
    $http.post('/game/' + playerId, { image: image } )
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
    $http.get('/game/' + gameCode )
    .then(function(){

    }), function(err){
      
      console.log("There was an error registering the player", err)
      
    }
    //make a new player object in the database

    //make an update to the game object so it knows another

    //count should be incremented on the game object

    //row in the table 
  }
  return services;
});

// Store all four images in an object 
// On the result page, you'll create a canvas that has four images on top of it
