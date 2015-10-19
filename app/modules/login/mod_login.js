angular.module('mod_login', ['ngCookies'])

    .run(function($rootScope){
        $rootScope.login = {};
        $rootScope.login.path = '/modules/login';
    });
