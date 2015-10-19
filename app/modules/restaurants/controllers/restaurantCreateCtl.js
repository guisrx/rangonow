angular.module('mod_restaurants')

    .controller('restaurantCreateCtl', ['$scope', 'restaurantsSvc',
        function ($scope, restaurantsSvc) {

           $scope.restaurant = restaurantsSvc.emptyRestaurant();

           $scope.create = function() {
                console.log('creating: ' + JSON.stringify($scope.restaurant));

                restaurantsSvc.create(function(){ $scope.go('/restaurants') }, $scope.restaurant);
           }

           $scope.closeAlert = function(index) {
               $scope.alerts.splice(index, 1);
           };

        }]
    );
