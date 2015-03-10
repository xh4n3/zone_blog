var zoneCtrl = angular.module('zoneCtrl', []);

zoneCtrl.controller('homepageCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.keyword = '';
    $scope.songurl = '';
    $http.get('/post/json').success(function (data) {
        $scope.posts = data;
    });
    $scope.search = function (event) {
        if (event.which === 13) {
            $http.post('/search/json', {
                keyword: $scope.keyword
            }).success(function (data) {
                $scope.json = data;
            })
        }
    };
    $scope.select = function (song) {
        $scope.songurl = song['mp3Url'];
        $scope.songname = song['name'];
    };
  }]);


zoneCtrl.controller('postshowCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.postid = $routeParams.postid;
    $http.get('/post/' + $scope.postid).success(function (data) {
        $scope.post = data[0];
    });
    }]);

(function (angular) {
    "use strict";
    $(function SetMomentLocale() {
        var language = navigator.language || navigator.userLanguage;
        language = language.substr(0, 2);
        if (language == "zh") {
            moment.locale("zh-cn");
        }
    });
})(window.angular);