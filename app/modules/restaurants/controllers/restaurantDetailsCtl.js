angular.module('mod_restaurants')

    .controller('restaurantDetailsCtl', ['$scope', '$routeParams', 'restaurantsSvc',

        function ($scope, $routeParams, restaurantsSvc) {

            $scope.loadData = function() {
                var restaurantId = $routeParams.restaurantId;
                console.log('Retrieving restaurant: ' + restaurantId)

                restaurantsSvc.restaurant(function(restaurant) {
                    $scope.restaurant = restaurant;
                }, restaurantId);
            };

            $scope.loadData();

            $scope.update = function() {
                console.log('updating: ' + JSON.stringify($scope.restaurant));
                restaurantsSvc.save(function(){ $scope.go('/restaurants') }, $scope.restaurant);
            }

            $scope.closeAlert = function(index) {
               $scope.alerts.splice(index, 1);
           };

        }]
    );
