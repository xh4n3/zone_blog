var myApp = angular.module('zoneApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://m1.music.126.net/**'
  ]);
    
  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    'http://myapp.example.com/clickThru**'
  ]);
});
myApp.controller('zoneCtrl', ['$scope','$http',function($scope, $http) {

    $scope.keyword ='';
    $scope.songurl='';
    $scope.search = function() {
        $http.post('getjson',{keyword:$scope.keyword}).success(function(data){
            $scope.json=data;
        })
    };
    $scope.geturl = function(url) {
        $scope.songurl=url;
    };
  }]);