angular.module('mod_teams')

    .controller('teamDetailsCtl', ['$scope', '$routeParams', 'teamsSvc',

        function ($scope, $routeParams, teamsSvc) {

            $scope.loadData = function() {
                var teamId = $routeParams.teamId;
                console.log('Retrieving team: ' + teamId)

                teamsSvc.team(function(team) {
                    $scope.team = team;
                }, teamId);
            };

            $scope.loadData();

            $scope.update = function() {
                console.log('updating: ' + JSON.stringify($scope.team));
                teamsSvc.save(function(){ $scope.go('/teams') }, $scope.team);
            }

            $scope.closeAlert = function(index) {
               $scope.alerts.splice(index, 1);
           };

        }]
    );
