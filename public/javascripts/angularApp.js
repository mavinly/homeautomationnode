var app = angular.module('doorSensorReadings', ['ui.router']);

app.factory('readings',  ['$http', function($http){
  var o = {
    readings: []
  };
  
  o.getAll = function() {
		return $http.get('/doorsensorreadings').success(function(data) {
			angular.copy(data, o.readings);
		});
	};
  
  return o;
}])

app.controller('MainCtrl', ['$scope', 'readings', function($scope, readings){
  $scope.readings = readings.readings;  

  $scope.addReading = function(){
    if($scope.body == ''){return;}
    $scope.post.
  }
  
}]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        Promise: ['readings', function(readings){
          return readings.getAll();
        }]
      }
    });

  $urlRouterProvider.otherwise('home');
}]);