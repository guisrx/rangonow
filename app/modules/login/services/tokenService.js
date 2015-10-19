
angular.module('mod_login')

    .service('tokenService', function($cookieStore) {

        userToken = null;

        this.hasToken = function() {
            if ($cookieStore.get('token'))
                userToken = $cookieStore.get('token')
            return (userToken != null);
        }

        this.token = function(newToken) {
            if (newToken)
                userToken = newToken;
            return userToken;
        }

        this.deleteToken = function() {
            userToken = null;
        }

        this.logout = function() {
            this.deleteToken();
            $cookieStore.remove('token');
        }
    }
);
