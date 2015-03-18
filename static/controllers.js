var zoneCtrl = angular.module('zoneCtrl', []);

/* as main controller to controll music */
zoneCtrl.controller('zoneCtrl', ['$scope', 'searchMusic', function ($scope, searchMusic) {
    $scope.keyword = '';
    $scope.songurl = '';
    $scope.showmusic = false;
    $scope.search = function (event) {
        if (event.which === 13) {
            /* if pressed Enter */
            searchMusic.setkeyword($scope.keyword);
            /* searchMusic as a service defined in app.js*/
            searchMusic.search().then(function (data) {
                $scope.json = data;
            }, function (data) {
                alert(data);
            });
        }
    };
    $scope.select = function (song) {
        $scope.songurl = song['mp3Url'];
        $scope.songname = song['name'];
    };
}]);

zoneCtrl.controller('homepageCtrl', ['$scope', '$http', '$sce', '$routeParams', 'getPost', 'searchMusic',
    function ($scope, $http, $sce, $routeParams, getPost, searchMusic) {

        $scope.nextpage = false;

        if (parseInt($routeParams.pageid) > 0) {
            $scope.pageid = parseInt($routeParams.pageid);
        } else {
            $scope.pageid = 1;
        };

        var initialization = function () {
            getPost.getByPageId($scope.pageid).then(function (data) {
                $scope.posts = data;
            }, function (data) {
                alert(data);
            });

            /* test if page+1 doesnt exist */
            getPost.getByPageId($scope.pageid + 1).then(function (data) {
                if (data.length) {
                    $scope.nextpage = true;
                }
            }, function (data) {
                alert(data);
            });
        };
        initialization();

  }]);

zoneCtrl.controller('archiveCtrl', ['$scope', '$http', '$sce', '$routeParams', 'getPost', 'searchMusic',
    function ($scope, $http, $sce, $routeParams, getPost, searchMusic) {
        var initialization = function () {
            getPost.getByPageId(0).then(function (data) {
                //console.log(data);
                var cate = {};
                angular.forEach(data, function (item, key) {
                    //console.log(item['category']);
                    if (item['category'] in cate) {
                        //console.log(1);
                        //console.log(item['category']);
                        cate[item['category']].push(item);
                    } else {
                        //console.log(2);
                        cate[item['category']] = [];
                        cate[item['category']].push(item);
                    };
                });
                //console.log(cate);
                $scope.archive = cate;
            }, function (data) {
                alert(data);
            });
        };
        initialization();



  }]);

zoneCtrl.controller('postshowCtrl', ['$scope', '$routeParams', '$http', 'getPost', function ($scope, $routeParams, $http, getPost) {
    if ($routeParams.postid != null) {
        getPost.getByPostId($routeParams.postid).then(function (data) {
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