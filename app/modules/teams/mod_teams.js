angular.module('mod_teams', ['ngTable'])

    .run(function($rootScope){
            $rootScope.teams = {};
            $rootScope.teams.path = '/modules/teams';
    })
;

