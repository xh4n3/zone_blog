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
        if (status == '1') {
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

zoneCtrl.controller('posteditCtrl', ['$scope', '$window', '$routeParams', '$http', '$localStorage', '$sessionStorage', function ($scope, $window, $routeParams, $http, $localStorage, $sessionStorage) {

        var resetStorage = function () {
            $scope.$storage = $localStorage.$reset({
                title: '',
                body: '',
                category: 'archive'
            });
        };

        if ($routeParams.postid) {
            $scope.postid = $routeParams.postid;
            $http.get('/post/' + $scope.postid).success(function (data) {
                $scope.$storage = {}; /* fake $storage as a object */
                $scope.$storage.postid = $routeParams.postid;
                $scope.$storage.title = data[0]['title'];
                $scope.$storage.body = data[0]['body'];
                $scope.$storage.category = data[0]['category'];
            });
        } else {
            $scope.$storage = $localStorage; /* real storage defination */
            if ( !('body' in $scope.$storage)) {
                resetStorage(); /* reset function */
            }
        };

        $scope.post = function () {
            $http.post('/post/save' + ($routeParams.postid ? '/' + $routeParams.postid : ''), {
                title: $scope.$storage.title,
                category: $scope.$storage.category,
                body: $scope.$storage.body
            }).success(function (data) {
                $scope.status = data;
            }).then(resetStorage()).then(
                $window.history.back()
            )
        };

        $scope.discard = function () {
            resetStorage();
            $window.history.back();
        };
        $scope.select = function (cate) {
            $scope.$storage.category = cate;
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
                $scope.$storage.body = $scope.$storage.body + '![PICTURE](' + url + ')';
                $scope.uploading = false;
            }).error(function (data) {
                alert(data);
            });
        };

        $scope.onchange = function (element) {
            //console.log(element.selectionStart);
            //console.log('success');
            $scope.pos = element.selectionStart;
        };

        $scope.insert = function (item) {
            var toInsert = '';
            switch (item) {
            case 'bold':
                toInsert = '**bold**';
                break;
            case 'linkify':
                toInsert = '[title](http://url.com)';
                break;
            case 'mark':
                toInsert = '<mark>mark</mark>';
                break;
            case 'code':
                toInsert = '\n```\ncode\n```\n';
                break;
            default:
                break;
            }
            $scope.$storage.body = $scope.$storage.body.slice(0, $scope.pos) + toInsert + $scope.$storage.body.slice($scope.pos);
            $scope.pos = $scope.pos + toInsert.length;
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
                        $scope.$storage.body = $scope.$storage.body.slice(0, $scope.pos) + '\n![PICTURE](' + url + ')' + $scope.$storage.body.slice($scope.pos);
                    }).error(function (data) {
                        alert(data);
                    });
                };

            });
        };
}

]);