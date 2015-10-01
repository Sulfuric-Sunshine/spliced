angular.module('spliced', [
  'spliced.services',
  'spliced.draw',
  'spliced.ready',
  'ngRoute',
  'pw.canvas-painter',
  'spliced.home',
  'ngCookies'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .when('/game/:code', {
      templateUrl: 'app/ready/ready.html',
      controller: 'ReadyController'
    }) 
    .when('/game/:code/draw', {
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
