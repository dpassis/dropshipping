var app = angular.module('dropshipping.aboutController', []);


app.controller('AboutController',['$scope','$route', function ($scope,$route){

	$scope.name = "aboutController";
    //$scope.params = $routeParams;
    $scope.$route = $route;

}]);









