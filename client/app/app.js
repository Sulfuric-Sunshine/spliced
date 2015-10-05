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
    .when('/game', {
      redirectTo: '/'
    })
    .when('/game/:code', {
      templateUrl: 'app/ready/ready.html',
      controller: 'ReadyController'
    })
    .when('/game/:code/draw', {
      templateUrl: 'app/draw/draw.html',
      controller: 'DrawController'
    })
    .when('/game/:code/status', {
      templateUrl: 'app/ready/status.html',
      controller: 'ReadyController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
