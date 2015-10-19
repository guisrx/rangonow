
angular.module('mod_login')

    .service('tokenVerifierService', function($http) {

        this.isTokenValid = function(token) {

            if (! token)
                return false;

            $http.get(rangoNowAppConf.endPointBaseUrl  + "auth", { token: token })
                .success(function(data, status, headers, config) {
                    return true;
                })
                .error(function(data, status, headers, config) {
                    return false;
                });
        }
    }
);
