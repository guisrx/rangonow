#!/bin/env node

'use-strict';

describe('votesAccumulator', function() {

    var votesAccumulator = require('../server/business/votesAccumulator');

    beforeEach(function() {
        this.addMatchers({
            toBeJsonEqual: function(expected) {
                var first = JSON.stringify(this.actual);
                var second = JSON.stringify(expected);

                return first === second;
            }
        });
    });

    it('compute the votes of the day for each team', function() {

        var team1Id = '5';

        var teams = [{
            _id: team1Id,
            name: 'Dev Heroes',
            lunchTime: '12:00',
            pollCloseTime: '11:50',
            timeZone: -3,
            adminUser: '1' }];

        var restaurants = [{ 
            _id: '4', 
            name: 'Anita Restaurante' }];
        
        var users = [{ 
            _id: '3', 
            name: 'Selau',
            email: 'guisrx@gmail.com',
            password: '123456',
            enabled: true,
            token: '654321',
            shouldReceiveNotification: true }];

        var votes = [{ 
            _id: '2',
            user: '3',
            restaurant: '4',
            day: new Date(),
            team: '5',
            price: 15.20 }];

        var emptyVote = { 
            user: '3',
            restaurant: '',
            team: ''};

        var teamVotes = [];
        var expectedVotesMap = {};

        teamVotes.push({ 'user': 'Selau', 'restaurant': 'Anita Restaurante' });
        expectedVotesMap[team1Id] = teamVotes;

        var returnVotes = function(err, votes) {
            expect(votes).toBeJsonEqual(expectedVotesMap);
        };

        votesAccumulator.compute(users, restaurants, votes, teams, returnVotes);
    });

});
