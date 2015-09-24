angular.module('spliced.services', [])

.factory('Draw', function ($http) {
  var services = {};

  services.drawings = {};

  services.save = function(image, playerId) {
    services.drawings[playerId] = image;
    console.log(services.drawings);
    // write post request here! :) 
    // return $http.post('/game/')
  }

  services.stitch = function() {

  }


  return services;
});

// Store all four images in an object 
// On the result page, you'll create a canvas that has four images on top of it 