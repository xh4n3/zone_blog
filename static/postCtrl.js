myApp.controller('zoneCtrl', ['$scope','$http',function($scope, $http) {

    $scope.title ='';
    $scope.body='';
    $scope.category='category';
    $scope.post = function(title,body) {
        $http.post('/post/save',{title:title,body:body}).success(function(data){
            $scope.status=data;
        })
    };
    $scope.select = function(cate){
        $scope.category = cate;
        
    };

  }]);