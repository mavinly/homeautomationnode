var app = angular.module('doorSensorReadings', ['ui.router']);

app.factory('readings', [function(){
  var o = {
    readings: []
  };
  return o;
}])

app.controller('MainCtrl', ['$scope', 'readings', function($scope, readings){
  $scope.readings = readings.readings;
  
  // $scope.readings = [
  //   {id: 1, name:"Door 1", open: true},
  //   {id: 1, name:"Door 2", open: true},
  //   {id: 1, name:"Door 3", open: true},
  // ];
  
  $scope.addReading = function(){
    $scope.readings.push({id: 2, name:"Door 4", open: true})
  }
  
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);