angular.module('mod_restaurants')

    .controller('restaurantsCtl', ['$scope', 'restaurantsSvc',
        
        function($scope, restaurantsSvc) {

            $scope.loadData = function() {
                console.log('Retrieving restaurants.')

                restaurantsSvc.restaurants(function(data) {
                    $scope.restaurants = data;
                });
            };

            $scope.loadData();

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

        }
    ]);
