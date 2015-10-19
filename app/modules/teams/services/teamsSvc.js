angular.module('mod_teams')
    .service('teamsSvc',
        function($http, errorService) {

            this.teams = function(callback) {
                var teams_endpoint = rangoNowAppConf.endPointBaseUrl + "teams";
                console.log(teams_endpoint)

                $http.get(teams_endpoint)
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                    });
            }

            this.team = function(callback, teamId) {
                var team_endpoint = rangoNowAppConf.endPointBaseUrl + "teams/" + teamId;
                console.log(team_endpoint)

                $http.get(team_endpoint)
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                    });
            }

            this.emptyTeam = function() {
                var team = { name: '',
                             lunchTime: '',
                             pollCloseTime: '',
                             timeZone: -3,
                             adminUser: ''};

               return team;
            }

            this.create = function(callback, team) {
                console.log("Creating team: " + JSON.stringify(team))
                var url = rangoNowAppConf.endPointBaseUrl + "teams";

                $http.post(url, team)
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data);
                        errorService.apiError(data, status, headers, config);
                });
            }

            this.save = function(callback, team) {
                console.log("Updating team: " + JSON.stringify(team))
                var url = rangoNowAppConf.endPointBaseUrl + "teams/" + team._id;

                $http.put(url, team)
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
