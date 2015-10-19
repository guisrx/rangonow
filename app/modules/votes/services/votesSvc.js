angular.module('mod_votes')
    .service('votesSvc',

        function($http, errorService, $cookieStore) {

            this.emptyVote = function() {
                var vote = { user: $cookieStore.get('user_id'),
                             restaurant: '',
                             team: ''};
               return vote;
            }

            this.votes = function(callback) {
                var votes_endpoint = rangoNowAppConf.endPointBaseUrl + "votes";

                $http.get(votes_endpoint)
                    .success(function(data, status, headers, config) {
                        console.log('all votes');
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                    });
            }

            this.votedToday = function(callback) {
                var user = $cookieStore.get('user_id');
                var vote_endpoint = rangoNowAppConf.endPointBaseUrl + 'votes?user=' + user;

                $http.get(vote_endpoint)
                    .success(function(data, status, headers, config) {
                        console.log('user vote today');
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                    });
            }

            this.create = function(callback, vote) {
                console.log("Creating vote: " + JSON.stringify(vote))
                var url = rangoNowAppConf.endPointBaseUrl + "votes";

                $http.post(url, vote)
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
