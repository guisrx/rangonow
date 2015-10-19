'use-strict';

/*

Unable to test the votesCtl because of the use of Promise
and the static invocation of $scope.loadData. :(

Need to learn to make a ctl testable.

*/

describe('votesCtl', function() {

    var $rootScope;
    var $controller;

    var team1Id = 10;
    var votesCtl = null;

    beforeEach(module('mod_votes'));

    beforeEach(inject(function($injector) {

        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $q = $injector.get('$q');
        $scope = $rootScope.$new();

    }));

    beforeEach(inject(function($controller) {

        var teams = [{
            _id: '5',
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

        votesSvcMock = {
            emptyVote: sinon.stub().returns(emptyVote),
            users: sinon.stub().returns(42),
            votes: sinon.stub().returns(votes),
            votedToday: sinon.stub().returns(votes),
            create: sinon.stub().returns(42)
        };

        teamsSvcMock = {
            teams: sinon.stub().returns(teams),
            team: sinon.stub().returns(42),
            emptyTeam: sinon.stub().returns(42),
            create: sinon.stub().returns(42),
            save: sinon.stub().returns(42)
        };

        restaurantsSvcMock = {
            restaurants: sinon.stub().returns(restaurants),
            restaurant: sinon.stub().returns(42),
            emptyRestaurant: sinon.stub().returns(42),
            create: sinon.stub().returns(42),
            save: sinon.stub().returns(42)
        };

        votesCtl = $controller('votesCtl', { 
            $scope: $scope, 
            votesSvc: votesSvcMock, 
            teamsSvc: teamsSvcMock, 
            restaurantsSvc: restaurantsSvcMock,
            $q: $q });
    }));

    it('compute the votes of the day for each team', function() {

        var teamVotes = [];
        var votesMap = [];

        teamVotes.push({ 'user': 'Selau', 'restaurant': 'Anita Restaurante' });
        votesMap[team1Id] = teamVotes;

        console.log($scope.teams);

        expect(votesCtl.computeVotes).toBe(votesMap);
    });

});
