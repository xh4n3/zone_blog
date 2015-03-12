var zoneCtrl = angular.module('zoneCtrl', []);

zoneCtrl.controller('homepageCtrl', ['$scope', '$http', '$routeParams', 'getPost', 'searchMusic',
    function ($scope, $http, $routeParams, getPost, searchMusic) {
        $scope.keyword = '';
        $scope.songurl = '';
        $scope.nextpage = false;

        if (parseInt($routeParams.pageid) > 0) {
            $scope.pageid = parseInt($routeParams.pageid);
        } else {
            $scope.pageid = 1;
        };

        getPost.setPageId($scope.pageid);
        getPost.get().then(function (data) {
            $scope.posts = data;
        }, function (data) {
            alert(data);
        });
        
        /* test if page+1 doesnt exist */
        getPost.setPageId($scope.pageid + 1);
        getPost.get().then(function (data) {
            if (data.length) {
                $scope.nextpage = true;
            }
        }, function (data) {
            alert(data);
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