angular.module('spliced.result', [])

.controller('ResultController', function ($scope, Draw) {
  // Your code here
  $scope.data = {};
  $scope.data.drawings = Draw.drawings;

  // // this needs to have knowledge of whether or not the image is finished - so would use the services.js file 
  // // $scope.isFinished = Result.finished();
  $scope.data.loadImage = function(callback) {
    var canvas = document.getElementById('finalDrawing');
    var context = canvas.getContext('2d');

    var img1 = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var img4 = new Image(); 

    img1.onload = function() {
      img2.src = $scope.data.drawings[1].drawing;
    }
    img2.onload = function() {
      img3.src = $scope.data.drawings[2].drawing;
    }
    img3.onload = function() {
      img4.src = $scope.data.drawings[3].drawing;
    }
    img4.onload = function() {
      context.drawImage(img1, 0, 0);
      context.drawImage(img2, 0, 200);
      context.drawImage(img3, 0, 400);
      context.drawImage(img4, 0, 600);
    }
    img1.src = $scope.data.drawings[0].drawing;
    console.log("imageLoaded should be false", $scope.data.imageLoaded);
    callback();
  }

  $scope.data.imageLoaded = false;

  // $scope.download = function() {
  //   var image = document.getElementById("finalDrawing").toDataURL();
  // }

  $scope.data.loadImage(function() {
    $scope.data.imageLoaded = true;
    console.log("imageLoaded should be true");
  });

})

