angular.module('mod_utils')

    .service('errorService', function($location) {

        this.apiError = function(data, status, headers, config) {
            console.log(data);

            if (status == 404) {
                $location.path('/not_found', false);
                return;
            }

            if ((status == 500) || (status == 0)) {
                $location.path('/internal_error', false);
                return;
            }

            var response;
            try {
                 response = data['error'];
            } catch(error) {
                 response = 'Sorry, an unknown error has occurred!';
            }

            alert(response);
        }
    });
