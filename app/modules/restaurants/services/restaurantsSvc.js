angular.module('mod_restaurants')
    .service('restaurantsSvc',
        function($http, errorService) {

            this.restaurants = function(callback) {
                var restaurants_endpoint = rangoNowAppConf.endPointBaseUrl + "restaurants";
                console.log(restaurants_endpoint)

                $http.get(restaurants_endpoint)
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                    });
            }

            this.restaurant = function(callback, restaurantId) {
                var restaurant_endpoint = rangoNowAppConf.endPointBaseUrl + "restaurants/" + restaurantId;
                console.log(restaurant_endpoint)

                $http.get(restaurant_endpoint)
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                    });
            }

            this.emptyRestaurant = function() {
                var restaurant = { name: '',
                                   price: 0.0};

               return restaurant;
            }

            this.create = function(callback, restaurant) {
                console.log("Creating restaurant: " + JSON.stringify(restaurant))
                var url = rangoNowAppConf.endPointBaseUrl + "restaurants";

                $http.post(url, restaurant)
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                });
            }

            this.save = function(callback, restaurant) {
                console.log("Updating restaurant: " + JSON.stringify(restaurant))
                var url = rangoNowAppConf.endPointBaseUrl + "restaurants/" + restaurant._id;

                $http.put(url, restaurant)
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                });
            }
        }
    );
