var app = angular.module('flapperNews', []);

app.controller('MainCtrl', ['$scope', function($scope){
  $scope.test = 'Hello world!';
  $scope.readings = [
    'reading 1',
    'reading 2',
    'reading 3'
  ];
}]);