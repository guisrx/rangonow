angular.module('mod_votes')

    .controller('votesCtl', ['$scope', 'votesSvc', 'teamsSvc', 'restaurantsSvc', '$q',
        function($scope, votesSvc, teamsSvc, restaurantsSvc, $q) {

            $scope.alerts = [];

            $scope.create = function() {
                console.log('creating: ' + JSON.stringify($scope.vote));

                votesSvc.create(function() { 
                    $scope.go('/votes');
                    $scope.votedToday = true;
                    $scope.evaluateVoteEnabled();
                 }, $scope.vote);
            }

            $scope.loadData = function() {
                console.log('Retrieving votes.');

                $scope.vote = votesSvc.emptyVote();
                $scope.canVote = false;

                votesSvc.votes(function(data) {
                    $scope.votesMap = data;
                });

                teamsSvc.teams(function(teams) {
                    $scope.teams = teams;

                    $scope.availableTeams = [];
                    $scope.teams.forEach(function(team) {

                        var timeNow = moment().format('HH:mm:ss');
                        var pollCloseTimeMinutes = moment.duration(team.pollCloseTime).asMinutes();
                        var timeNowMinutes = moment.duration(timeNow).asMinutes();

                        team.available = false;
                        if (timeNowMinutes < pollCloseTimeMinutes) {
                            team.available = true;
                            $scope.availableTeams.push(team);
                        }
                    });

                    if ($scope.availableTeams && ($scope.availableTeams.length > 0))
                        $scope.vote.team = $scope.availableTeams[0]._id;

                    $scope.evaluateVoteEnabled();
                });

                restaurantsSvc.restaurants(function(restaurants) {
                    $scope.restaurants = restaurants;
                    $scope.evaluateVoteEnabled();

                    if (restaurants && (restaurants.length > 0))
                        $scope.vote.restaurant = $scope.restaurants[0]._id;
                });
            };

            $scope.evaluateVoteEnabled = function() {

                $scope.canVote = (($scope.restaurants) 
                    && ($scope.restaurants.length > 0)
                    && ($scope.availableTeams) 
                    && ($scope.availableTeams.length > 0)
                    && (! $scope.votedToday));
            }

            $scope.loadData();

            $scope.votedToday = false;
            votesSvc.votedToday(function(vote) {

                if (vote.length > 0) {
                    console.log('User voted today.');

                    $scope.votedToday = true;
                    $scope.evaluateVoteEnabled();
                }
            });
            
            $scope.alerts.push({
                msg: 'Please register your team and the available restaurants to create a poll.',
                type: 'success'
            });

            $scope.closeAlert = function(index) {
               $scope.alerts.splice(index, 1);
            };

        }]
    );
