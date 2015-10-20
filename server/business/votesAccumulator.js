#!/bin/env node

"use strict";

module.exports = {

	compute: function compute(users, restaurants, votes, teams, callback) {

        var usersMap = {};
        var restaurantsMap = {};
        var votesMap = {};
        var teamsMap = {};

        teams.forEach(function(team) {
            teamsMap[team._id] = team;
        });

        restaurants.forEach(function(restaurant) {
            restaurantsMap[restaurant._id] = restaurant.name;
        });

        users.forEach(function(user) {
            usersMap[user._id] = user.name;
        });

        // register each vote in each team
        votes.forEach(function(vote) {
            var teamVotes = votesMap[vote.team] || [];
            var team = teamsMap[vote.team];

            var restaurantsVoteMap = team.restaurantsVoteMap || [];
            var restaurantVoteAcc = restaurantsVoteMap[vote.restaurant];
            restaurantVoteAcc = (restaurantVoteAcc) ? restaurantVoteAcc++ : 1;
            restaurantsVoteMap[vote.restaurant] = restaurantVoteAcc;
            team.restaurantsVoteMap = restaurantsVoteMap;

            teamVotes.push({ 
            	'user': usersMap[vote.user], 
            	'restaurant': restaurantsMap[vote.restaurant]
            });

            votesMap[vote.team] = teamVotes;
        });

        // find the most voted restaurant until now
        teams.forEach(function(team) {
            var restaurantMostVoted = null;
            var restaurantMostVotedCount = 0;

            if (team.restaurantsVoteMap)
                for (var restaurant in team.restaurantsVoteMap) {
                    var restaurantVotes = team.restaurantsVoteMap[restaurant];

                    if (restaurantVotes > restaurantMostVotedCount) {
                        restaurantMostVotedCount = restaurantVotes;
                        restaurantMostVoted = restaurant;
                    }
                }

            team.hasMostVoted = false;
            if (restaurantMostVoted) {
                team.hasMostVoted = true;
                team.mostVoted = restaurantsMap[restaurantMostVoted];
            }
        });

        callback(null, votesMap);
    }

}
