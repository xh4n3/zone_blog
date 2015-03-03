myApp.controller('zoneCtrl', ['$scope','$http',function($scope, $http) {

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
