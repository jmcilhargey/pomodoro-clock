var app = angular.module("pomodoroApp", []);

app.controller("MainController", ["$scope", "$interval", function($scope, $interval) {
   
  $scope.workTime = 30;
  $scope.breakTime = 10;
  $scope.timeLeft = $scope.workTime;

  var runTimer = false;
  var sec = $scope.timeLeft * 60;
  // Add and subtract mins
  $scope.workChange = function(min) {
    if ($scope.workTime > 0) {
      $scope.workTime += min;
      $scope.timeLeft = $scope.workTime;
      sec = $scope.timeLeft * 60;
    }
  }
  
  $scope.breakChange = function(min) {
    if ($scope.breakTime > 0) {
      $scope.breakTime += min;
    }
  }
  
  // Start time and run countTimer every second, else turn off timer
  $scope.startTimer = function() {
    if (!runTimer) {
      runTimer = $interval(countTimer, 1000);
    } else {
      $interval.cancel(runTimer);
      runTimer = false;
    }
  }
  
  function countTimer() {
    if (sec > 0 && runTimer) {      
      // Decrease sec by 1 each interval
      sec -= 1;
      // Convert to digital view. See ftn below.
      $scope.timeLeft = toDigital(sec)
    } else {
      // Play sound at 0
      var sound = "https://dl.dropboxusercontent.com/u/63260308/Portfolio/Images/timer-ding.mp3";
      var audio = new Audio(sound)
      audio.play();
      // Turn off timer
      $interval.cancel(runTimer);
      runTimer = false;
      // Set time to break and calc sec
      $scope.timeLeft = $scope.breakTime
      sec = $scope.timeLeft * 60;
    }
  }
    
  function toDigital(seconds) {

    var minute = Math.floor(seconds % 3600 / 60);
    var second = Math.floor(seconds % 3600 % 60);
    return (
      (minute < 10 ? "0" : "") + minute + ":" + (second < 10 ? "0" : "") + second
    );
  }
  
}]);