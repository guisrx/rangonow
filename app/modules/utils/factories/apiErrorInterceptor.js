//angular.module('mod_utils')
//
//    .factory('apiErrorInterceptor', function ($q) {
//            return {
//                'responseError': function (rejection) {
//                    if (rejection.status === 503) {
//                        // Stop poller or provide visual feedback to the user etc
//
//                        alert('Error');
//                        //poller.stopAll();
//                    }
//                    return $q.reject(rejection);
//                }
//            };
//    });
