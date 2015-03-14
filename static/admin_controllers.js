var zoneCtrl = angular.module('zoneCtrl', []);

zoneCtrl.controller('adminCtrl', ['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.keyword = '';
    $scope.songurl = '';
    $scope.deleting = false;
    $scope.uploading = false;

    $http.get('/post/list').success(function (data) {
        $scope.posts = data;
    });

    $scope.lock = function (postid, status) {
        if (status == 'black lock') {
            $http.get('/post/unlock/' + postid).success(function () {
                $route.reload()
            }).error(function (data) {
                alert(data);
            })
        } else {
            $http.get('/post/lock/' + postid).success(function () {
                $route.reload()
            }).error(function (data) {
                alert(data);
            })
        }
    };
    $scope.delete = function (postid) {
        if ($scope.deleting == true) {
            $http.get('/post/delete/' + postid, {})
                .success(function (data) {
                    $route.reload();
                })
        } else {
            $scope.deleting = true;
        }
    };
    }]);

zoneCtrl.controller('postshowCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $scope.postid = $routeParams.postid;
    $http.get('/post/' + $scope.postid).success(function (data) {
        $scope.post = data[0];
    })
}]);


zoneCtrl.controller('posteditCtrl', ['$scope', '$window', '$routeParams', '$http', function ($scope, $window, $routeParams, $http) {
        if ($routeParams.postid) {
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
                }).then($window.history.back())
            };
        } else {
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
                }).then($window.history.back())
            };
        };

        $scope.discard = function () {
            $window.history.back()
        };
        $scope.select = function (cate) {
            $scope.category = cate;
        };

        $scope.upload = function (element) {
            var fd = new FormData()
            fd.append('file', element.files[0]);
            $http.post("/post/upload", fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function (url) {
                $scope.body = $scope.body + '![PICTURE](' + url + ')';
                $scope.uploading = false;
            }).error(function (data) {
                alert(data);
            });
        };
        $scope.insert = function (item) {
            console.log(item);
            switch (item) {
            case 'bold':
                $scope.body = $scope.body + '**bold**';
                break;
            case 'linkify':
                $scope.body = $scope.body + '[title](http://url.com)';
                break;
            case 'mark':
                $scope.body = $scope.body + '<mark>mark</mark>';
                break;
            case 'code':
                $scope.body = $scope.body + '```\ncode\n```';
                break;
            default:
                break;
            }

        };
        $scope.paste = function (event) {
            //console.log(event);
            //console.log(event.originalEvent);
            var clipData = event.originalEvent.clipboardData;
            //console.log(clipData.types);
            //console.log(clipData.getData("Text"));
            angular.forEach(clipData.items, function (item, key) {
                //console.log({item: item,key: key});
                //console.log(clipData.items[key]);
                //console.log(clipData.items[key]['type']);
                if (clipData.items[key]['type'].match(/image.*/)) {
                    // is a image
                    var img = clipData.items[key].getAsFile();
                    //console.log(img);
                    var fd = new FormData();
                    fd.append('file', img);
                    $http.post("/post/paste", fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }).success(function (url) {
                        $scope.body = $scope.body + '\n![PICTURE](' + url + ')';
                    }).error(function (data) {
                        alert(data);
                    });
                };

            });
        };
        }

]);