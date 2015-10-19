angular.module('mod_restaurants', ['ngTable'])

    .run(function($rootScope){
            $rootScope.restaurants = {};
            $rootScope.restaurants.path = '/modules/restaurants';
    })
;

