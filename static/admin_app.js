//angular.module('markdown', []).config(function (markdownProvider) {
//    markdownProvider.config({
//        extensions: ['table']
//    });
//});

var zoneAdmin = angular.module('zoneAdmin', ['ngRoute', 'zoneCtrl', 'markdown'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

zoneAdmin.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://m1.music.126.net/**'
  ]);
});
zoneAdmin.config(['$routeProvider',
              function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/admin/index',
            controller: 'adminCtrl'
        }).

        when('/post/id/:postid', {
            templateUrl: '/post/show',
            controller: 'postshowCtrl'
        }).
        when('/admin', {
            templateUrl: '/admin',
            controller: 'adminCtrl'
        }).
        when('/post/new', {
            templateUrl: '/post/edit',
            controller: 'posteditCtrl'
        }).
        when('/post/edit/:postid', {
            templateUrl: '/post/edit',
            controller: 'posteditCtrl'
        }).
        otherwise({
            redirectTo: '/error'
        });
  }]);
zoneAdmin.filter('fromNow', function () {
    return function (date) {
        return moment(date).fromNow();
    }
});
