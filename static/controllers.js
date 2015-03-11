var zoneCtrl = angular.module('zoneCtrl', []);

zoneCtrl.controller('homepageCtrl', ['$scope', '$http', 'searchMusic', function ($scope, $http, searchMusic) {
    $scope.keyword = '';
    $scope.songurl = '';
    $http.get('/post/json').success(function (data) {
        $scope.posts = data;
    });
    $scope.search = function (event) {
        if (event.which === 13) { /* if pressed Enter */
            searchMusic.setkeyword($scope.keyword); /* searchMusic as a service defined in app.js*/
            searchMusic.search().then(function (data) {
                $scope.json = data;
            }, function (data) {
                alert(data);
            });

            /*            $http.post('/search/json', { //use http directly
                            keyword: $scope.keyword
                        }).success(function (data) {
                            $scope.json = data;
                        })*/
        }
    };
    $scope.select = function (song) {
        $scope.songurl = song['mp3Url'];
        $scope.songname = song['name'];
    };
  }]);

zoneCtrl.controller('postshowCtrl', ['$scope', '$routeParams', '$http', 'getPost', function ($scope, $routeParams, $http, getPost) {
    if ($routeParams.postid != null) {
        getPost.setPostid($routeParams.postid);
        
        getPost.get().then(function (data) {
            $scope.post = data[0];
        }, function (data) {
            alert(data);
        });
    };
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