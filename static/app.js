angular.module('markdown',[]).config(function (markdownProvider) {
    markdownProvider.config({
        extensions: ['table']
    });
});

var myApp = angular.module('zoneApp', ['ngRoute', 'zoneCtrl', 'markdown'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}).config(function ($sceDelegateProvider) {
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
              function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'home',
            controller: 'homepageCtrl'
        }).
        when('/post/id/:postid', {
            templateUrl: '/post/show',
            controller: 'postshowCtrl'
        }).
        otherwise({
            redirectTo: '/error'
        });
  }]);
myApp.filter('fromNow', function () {
    return function (date) {
        return moment(date).zone(480).fromNow();
    }
});
