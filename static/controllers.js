var homepageCtrl = angular.module('zoneCtrl', []);
homepageCtrl.controller('homepageCtrl', ['$scope','$http',function($scope, $http) {

    $scope.keyword ='';
    $scope.songurl='';
    $http.get('/post/json').success(function(data){
            $scope.posts=data;
        });
    $scope.search = function(event) {
        if (event.which === 13){
        $http.post('/search/json',{keyword:$scope.keyword}).success(function(data){
            $scope.json=data;
        })}
    };
    $scope.select = function(song) {
        $scope.songurl=song['mp3Url'];
        $scope.songname=song['name'];
    };
    
  }]);
homepageCtrl.controller('postshowCtrl', ['$scope','$routeParams','$http',function($scope, $routeParams) {
    $scope.postid = $routeParams.postid;
    }]);

homepageCtrl.controller('postnewCtrl', ['$scope','$http',function($scope, $http) {

    $scope.title ='';
    $scope.body='';
    $scope.category='archive';
    $scope.post = function(title,body) {
        $http.post('/post/save',{title:title,body:body}).success(function(data){
            $scope.status=data;
        })
    };
    $scope.select = function(cate){
        $scope.category = cate;
        
    };

  }]);
(function (angular) {
  "use strict";
  $(function SetMomentLocale () {
    var language = navigator.language || navigator.userLanguage;
    language = language.substr(0, 2);
    if (language == "zh") {
      moment.locale("zh-cn");
    }
  });
    
  angular.module("zoneApp").filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
  
})(window.angular);
