var myApp = angular.module('zoneApp', ['ngRoute','zoneCtrl'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://m1.music.126.net/**'
  ]);
    
  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    'http://myapp.example.com/clickThru**'
  ]);
});

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'homepage.html',
        controller: 'homepageCtrl'
      }).
      when('/post/id/:postid', {
        templateUrl: 'postshow.html',
        controller: 'postshowCtrl'
      }).
      when('/post/new', {
        templateUrl: 'postnew.html',
        controller: 'postnewCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);