angular.module('mod_login')

    .controller('loginCtl', ['$scope', '$location', '$http', 'tokenService', 'emailService', '$cookieStore',
        function ($scope, $location, $http, tokenService, emailService, $cookieStore) {

            $scope.user = {
                email: '',
                password: '',
                shouldReceiveNotification: ''
            };

            $scope.password_confirmation = '';

            $scope.initUserData = function(user) {

                tokenService.token(user.token);
                emailService.email(user.email);

                $cookieStore.put('email', user.email);
                $cookieStore.put('token', user.token);
                $cookieStore.put('user_id', user._id);
            }

            $scope.signIn = function() {
                $scope.alerts = [];

                if (! $scope.validateEmail($scope.user.email)) {
                    $scope.alerts.push({
                        msg: 'Invalid e-mail address.',
                        type: 'danger'
                    });
                    return;
                }

                $scope.user.password = CryptoJS.SHA256($scope.user.raw_password).toString();

                $http.post(rangoNowAppConf.endPointBaseUrl  + "auth", $scope.user)
                    .success(function(user, status, headers, config) {

                        console.log('Success auth response:');
                        console.log(user);

                        $scope.initUserData(user);
                        $location.path(rangoNowAppConf.defaultEndPoint , false);
                    })
                    .error(function(data, status, headers, config) {
                        $scope.alerts = [];

                        data = data ? data : 'We are without connectivity with the server.'
                        $scope.alerts.push({ msg: data, type: 'danger' });
                    });
            }

            $scope.doCreateAccount = function() {
                $scope.alerts = [];

                if (! $scope.validateEmail($scope.user.email)) {
                    $scope.alerts.push({
                        msg: 'Invalid e-mail address.',
                        type: 'danger'
                    });
                    return;
                }

                if ($scope.user.password != $scope.password_confirmation) {
                    $scope.alerts.push({
                        msg: 'Passwords don\'t match.',
                        type: 'danger'
                    });
                    return;
                }

                $scope.user.password = CryptoJS.SHA256($scope.user.password).toString();

                $http.post(rangoNowAppConf.endPointBaseUrl  + "users", $scope.user)
                    .success(function(user, status, headers, config) {

                        $scope.initUserData(user);
                        $scope.go('/votes');
                    })
                    .error(function(data, status, headers, config) {

                        data = data ? data : 'We are without connectivity with the server.'
                        $scope.alerts.push({ msg: data, type: 'danger' });
                    });
            }

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.validateEmail = function(mail) {
                return (/^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
            }

    }]
);
