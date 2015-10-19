
var rangoNowApp = angular.module('rangoNowApp',
    ['ngRoute', 'restangular', 'ui.bootstrap', 'ngCookies', 'mod_teams', 
     'mod_utils', 'mod_restaurants', 'mod_votes', 'mod_login']);

rangoNowApp.controller('mainCtl', ['$location',
                                   '$scope',
                                   '$http',
                                   '$cookieStore',
                                   'Restangular',
                                   'tokenService',
                                   'emailService',
                                   function($location,
                                            $scope,
                                            $http,
                                            $cookieStore,
                                            Restangular,
                                            tokenService,
                                            emailService) {
        
        $scope.visibilities = {};

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.isPath = function (path) {
            return $location.path() == path;
        };

        $scope.visibilities = { showMenu: false };

        $scope.changeVisibilities = function() {

            $scope.visibilities.showMenu = ($location.path() != '/login') && ($location.path() != '/account');
        }

        $scope.$on('$locationChangeStart', function(event) {
            $scope.changeVisibilities();

            console.log($location.path());

            if (($location.path() == '/login') && (tokenService.hasToken())) {
                $scope.go('/votes');
                return;
            }

            if (! tokenService.hasToken() && !($location.path() == '/account')) {
                $scope.go('/login');
                return;
            }
         });

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.email = emailService.email;

        $scope.logout = function() {
            tokenService.logout();
            $scope.go('/login');
        }
    }

]);
