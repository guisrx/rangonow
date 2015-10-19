angular.module('mod_teams')

    .controller('teamCreateCtl', ['$scope', 'teamsSvc',
        function ($scope, teamsSvc) {

           $scope.team = teamsSvc.emptyTeam();

           $scope.create = function() {
                console.log('creating: ' + JSON.stringify($scope.team));

                teamsSvc.create(function(){ $scope.go('/teams') }, $scope.team);
           }

           $scope.closeAlert = function(index) {
               $scope.alerts.splice(index, 1);
           };

        }]
    );
