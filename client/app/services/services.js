angular.module('spliced.services', [])

.factory('Draw', function ($http) {
  var services = {};


  return services;  
})
.factory('Result', function ($http, $location, $window) {
  var services = {};

  services.save = function(image) {
    // write post request here! :) 
    // return $http.post('/game/')
  }

  return services;
});
