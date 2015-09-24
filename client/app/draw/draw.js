angular.module('spliced.draw', [])

.controller('DrawController', function ($scope, $location) {
  // drawing info will go here.
  $scope.data = {};
  // $scope.data.id = // userid from the path using $location

  // $scope.data.image = // ng-model for the canvas itself, which we'll save

  // $scope.save = function() { somehow use the todataurl thing, make a post request inside our services! } 

});
