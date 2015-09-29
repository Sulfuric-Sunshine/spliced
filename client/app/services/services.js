angular.module('spliced.services', [])

.factory('Draw', function($http) {
  var services = {};

  services.getFinalImage = function(callback, errorCallback) {
    $http.get('/game')
    .then(function(finalImageURL) { 
      callback(finalImageURL.data)
    }, function(err) {
      console.log("There was an error retrieving the final image URL.");
      errorCallback(err);
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
