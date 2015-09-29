angular.module('spliced', [
  'spliced.services',
  'spliced.draw',
  'spliced.result',
  'ngRoute',
  'pw.canvas-painter',
  'spliced.home'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .when('/game', {
      templateUrl: 'app/result/result.html',
      controller: 'ResultController'
    })
    .when('/game/:playerId', {
      templateUrl: 'app/draw/draw.html',
      controller: 'DrawController'
    })
    .otherwise({
      templateUrl: 'app/result/result.html',
      controller: 'ResultController'
    });
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
})
