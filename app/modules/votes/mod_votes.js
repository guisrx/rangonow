angular.module('mod_votes', ['ngTable'])

    .run(function($rootScope){
            $rootScope.votes = {};
            $rootScope.votes.path = '/modules/votes';
    })
;

