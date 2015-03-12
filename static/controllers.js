var zoneCtrl = angular.module('zoneCtrl', []);

zoneCtrl.controller('homepageCtrl', ['$scope', '$http', '$routeParams', 'searchMusic',
    function ($scope, $http, $routeParams, searchMusic) {
        $scope.keyword = '';
        $scope.songurl = '';

        if (parseInt($routeParams.pageid) > 0) {
            console.log(parseInt($routeParams.pageid));
            $scope.pageid = parseInt($routeParams.pageid);
        } else {
            $scope.pageid = 1;
        };

        $http.get('/post/json/' + $scope.pageid).success(function (data) {
            $scope.posts = data;
        });

        $http.get('/post/json/' + ($scope.pageid + 1)).success(function (data) {
            if (data.length) {
                $scope.maxpage = $scope.pageid + 1;
            }
        });
        /* isnot very efficient */


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