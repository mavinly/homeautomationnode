var app = angular.module('doorSensorReadings', ['ui.router']);

app.factory('readings',  ['$http', 'auth', function($http, auth){
  var o = {
    readings: []
  };
  
  o.getAll = function() {
		return $http.get('/doorsensorreadings').success(function(data) {
			angular.copy(data, o.readings);
		});
	};
  
  o.create = function(readings) {
    return $http.post('/doorsensorreadings', readings).success(function(data){
      headers: {Authorization: 'Bearer ' + auth.getToken()}
      o.readings.push(data);
    })
  }
  
  return o;
}])

.factory('auth', ['$http', '$window', '$rootScope', function($http, $window, $rootScope){
   var auth = {
    saveToken: function (token){
      $window.localStorage['flapper-news-token'] = token;
    },
    getToken: function (){
      return $window.localStorage['flapper-news-token'];
    },
    isLoggedIn: function(){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    },
    currentUser: function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    },
    register: function(user){
      return $http.post('/register', user).success(function(data){
        auth.saveToken(data.token);
      });
    },
    logIn: function(user){
      return $http.post('/login', user).success(function(data){
        auth.saveToken(data.token);
      });
    },
    logOut: function(){
      $window.localStorage.removeItem('flapper-news-token');
    }
  };

  return auth;
}])

app.controller('MainCtrl', ['$scope', 'readings', 'auth', function($scope, readings, auth){
  $scope.readings = readings.readings;  
  $scope.isLoggedIn = auth.isLoggedIn;
  
  $scope.addReading = function(){
    readings.create({id: 2, name:"Door 5", open: true, readingdatetime: Date.now()})
  }
  
}]);

app.controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
  $scope.user = {};

  $scope.register = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}])

.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
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
    })
    
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    })
    
  .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    });

  $urlRouterProvider.otherwise('home');
}]);