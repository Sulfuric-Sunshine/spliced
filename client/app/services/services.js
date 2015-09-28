angular.module('spliced.services', [])

.factory('Draw', function($http) {
  var services = {};

  services.getDrawings = function() {
    return $http({
      method: 'GET',
      url: '/game/',

    }).then(function(response) {
      //this is going to be a JSON object
      // with at least a boolean value indicating if the game is done or not
      // if(true) - there will be four objects similar to above
      //but it will look like this:
      // {"isFinished" : true/false, 
      // "player1": "urlHere"
      // "player2": "urlHere"
      // "player3": "urlHere"
      // "player4": "urlHere"
      //}
      return response.data;
    })
  }

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

  return services;
});

// Store all four images in an object 
// On the result page, you'll create a canvas that has four images on top of it
