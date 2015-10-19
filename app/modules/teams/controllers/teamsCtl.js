angular.module('mod_teams')

    .controller('teamsCtl', ['$scope', 'teamsSvc',
        function($scope, teamsSvc) {

            $scope.loadData = function() {
                console.log('Retrieving teams.')

                teamsSvc.teams(function(data) {
                    $scope.teams = data;
                });
            };

            $scope.loadData();

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

        }
    ]);
