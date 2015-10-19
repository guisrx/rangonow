angular.module('mod_login')

    .service('emailService', function($cookieStore, $http) {

        this.email = function(new_email) {
            if (new_email)
                $cookieStore.put('email', new_email);
            return $cookieStore.get('email');
        }

        this.deleteEmail = function() {
            $cookieStore.remove('email');
        }
    });
