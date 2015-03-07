var homepageCtrl = angular.module('zoneCtrl', []);
homepageCtrl.controller('homepageCtrl', ['$scope', '$http', function ($scope, $http) {

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
homepageCtrl.controller('adminCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {

    $scope.keyword = '';
    $scope.songurl = '';
    $scope.deleting=false;
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
    $scope.delete = function (postid) {
        if ($scope.deleting == true) {
            $http.get('/post/delete/' + postid, {})
                .success(function (data) {
                    $scope.json = data;
                    $route.reload();
                })
        } else {
            $scope.deleting = true;
        }
    };


  }]);
homepageCtrl.controller('postshowCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.postid = $routeParams.postid;
    $http.get('/post/' + $scope.postid).success(function (data) {
        $scope.title = data[0]['title'];
        $scope.html = data[0]['body'];
    });
    }]);
homepageCtrl.controller('postnewCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.title = '';
    $scope.body = '';
    $scope.category = 'archive';
    $scope.post = function () {
        $http.post('/post/save', {
            title: $scope.title,
            category: $scope.category,
            body: $scope.body
        }).success(function (data) {
            $scope.status = data;
        })
    };
    $scope.select = function (cate) {
        $scope.category = cate;
    };
  }]);
homepageCtrl.controller('posteditCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.postid = $routeParams.postid;
    $http.get('/post/' + $scope.postid).success(function (data) {
        $scope.title = data[0]['title'];
        $scope.body = data[0]['body'];
        $scope.category = data[0]['category'];
    });
    $scope.post = function () {
        $http.post('/post/save/' + $scope.postid, {
            title: $scope.title,
            category: $scope.category,
            body: $scope.body
        }).success(function (data) {
            $scope.status = data;
        })
    };
    $scope.select = function (cate) {
        $scope.category = cate;
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