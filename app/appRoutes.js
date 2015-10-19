rangoNowApp

    .config(function($routeProvider, $httpProvider) {

        // $httpProvider.interceptors.push('authInterceptor');

        // configure our routes
        $routeProvider

            .when("/login", {
               templateUrl: 'modules/login/views/login.html',
               controller: "loginCtl"
            })

            .when("/account", {
               templateUrl: 'modules/login/views/create_account.html',
               controller: "loginCtl"
            })

            .when("/teams", {
               templateUrl: 'modules/teams/views/teamsList.html',
               controller: "teamsCtl"
            })

            .when("/teams/create", {
                templateUrl: "modules/teams/views/teamCreate.html",
                controller: "teamCreateCtl"
            })

            .when("/teams/:teamId", {
                templateUrl: "modules/teams/views/teamDetails.html",
                controller: "teamDetailsCtl"
            })

            .when("/restaurants", {
               templateUrl: 'modules/restaurants/views/restaurantsList.html',
               controller: "restaurantsCtl"
            })

            .when("/restaurants/create", {
                templateUrl: "modules/restaurants/views/restaurantCreate.html",
                controller: "restaurantCreateCtl"
            })

            .when("/restaurants/:restaurantId", {
                templateUrl: "modules/restaurants/views/restaurantDetails.html",
                controller: "restaurantDetailsCtl"
            })

            .when("/votes", {
               templateUrl: 'modules/votes/views/votesList.html',
               controller: "votesCtl"
            })

            .when("/internal_error", {
                templateUrl: "modules/utils/views/internalError.html"
            })

            .when("/not_found", {
                templateUrl: "modules/utils/views/notFound.html"
            })

            .when("/", {
               redirectTo: '/login'
            })

            .otherwise({
               redirectTo: '/not_found'
            })
    })
;
