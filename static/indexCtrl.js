myApp.controller('zoneCtrl', ['$scope','$http',function($scope, $http) {

    $scope.keyword ='';
    $scope.songurl='';
    $scope.search = function(event) {
        if (event.which === 13){
        $http.post('getjson',{keyword:$scope.keyword}).success(function(data){
            $scope.json=data;
        })}
    };
    $scope.select = function(song) {
        $scope.songurl=song['mp3Url'];
        $scope.songname=song['name'];
    };
  }]);