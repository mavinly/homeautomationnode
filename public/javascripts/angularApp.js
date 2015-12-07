var app = angular.module('doorSensorReadings', []);

app.controller('MainCtrl', ['$scope', function($scope){
  $scope.readings = [
    {id: 1, name:"Door 1", open: true},
    {id: 1, name:"Door 2", open: true},
    {id: 1, name:"Door 3", open: true},
  ];
  
  $scope.addReading = function(){
    $scope.readings.push({id: 2, name:"Door 4", open: true})
  }
  
}]);