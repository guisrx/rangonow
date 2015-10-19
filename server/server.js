#!/bin/env node
//  OpenShift Rango Now Node application

// dependencies
var schemaDataAccess = require('./model/schemaDataAccess');
var HttpStatus = require('http-status-codes');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var schedule = require('node-schedule');
var moment = require('moment');
var q = require('q');

/**
 *  Define the Rango Now application.
 */
var RangoNowApp = function() {

    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8081;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { './app/index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['./app/index.html'] = fs.readFileSync('./app/index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {

        self.app.use(bodyParser.urlencoded({ extended: true }));
        self.app.use(bodyParser.json());

        self.app.get('/', function(request, response) {

            response.setHeader('Content-Type', 'text/html');
            response.send(self.cache_get('./app/index.html') );
        });

        self.createVoteRoutes();
        self.createUserRoutes();
        self.createTeamRoutes();
        self.createRestaurantRoutes();
        self.createTestRoutes();

        self.app.use(express.static('./app'));
        self.app.use('/bower_components',  express.static('./bower_components'));
    };

    self.createTestRoutes = function() {

        self.app.get('/mongoose', function(request, response) {
            var mongooseConnString = schemaDataAccess.mongooseConnectionSerialized();
            var mongooseConn = JSON.parse(mongooseConnString);

            if (mongooseConn && mongooseConn.connections) {
                mongooseConn.connections.forEach(function(conn) {
                    conn.pass = '****';
                });
            }

            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify(mongooseConn));
        });

        self.app.get('/ping/:msg', function(request, response) {

            response.setHeader('Content-Type', 'text/plain');

            response.send(request.params.msg);
        });
    }

    self.createVoteRoutes = function() {

        self.app.get('/votes', function(request, response) {
            console.log('requesting votes');
            console.log(request.query);

            var user = request.query.user;

            response.setHeader('Content-Type', 'application/json');

            var returnVotes = function(err, votes) {
                                response.send(JSON.stringify(votes));
                              };

            if (user) {
                schemaDataAccess.retrieveUserVoteToday(user, returnVotes);
                return;
            }

            self.computeVotes(returnVotes);
        });

        self.app.post('/votes', function(request, response) {
            console.log('creating a vote ....');
            console.log(request.body);

            schemaDataAccess.createVote(request.body);
            response.send(HttpStatus.OK);
        });
    }

    self.computeVotes = function(callback) {
        console.log('computing votes');

        var users = {};
        var restaurants = {};
        var votes = {};
        var teams = {};

        var votesPromise = new Promise(function(resolve, reject) {
            schemaDataAccess.retrieveTodayVotes(function(error, data) {
                if(error) {
                    reject();
                }
                votes = data;
                resolve();
            });
        });

        var usersPromise = new Promise(function(resolve, reject) {
            schemaDataAccess.retrieveUsers(function(error, data) {
                if(error) {
                    reject();
                }
                users = data;
                resolve();
            });
        });

        var teamsPromise = new Promise(function(resolve, reject) {
            schemaDataAccess.retrieveTeams(function(error, data) {
                if(error) {
                    reject();
                }
                teams = data;
                resolve();
            });
        });

        var restaurantsPromise = new Promise(function(resolve, reject) {
            schemaDataAccess.retrieveRestaurants(function(error, data) {
                if(error) {
                    reject();
                }
                restaurants = data;
                resolve();
            });
        });

        q.all([votesPromise, usersPromise, teamsPromise, restaurantsPromise]).then(function() {
            console.log('votes calculation');

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

                teamVotes.push({ 'user': usersMap[vote.user], 'restaurant': restaurantsMap[vote.restaurant]});

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

            console.log('votes map');
            console.log(votesMap);

            callback(null, votesMap);

        });
    }

    self.createUserRoutes = function() {

        self.app.get('/users/:id', function(request, response) {
            console.log('requesting user: ' + request.params.id);

            response.setHeader('Content-Type', 'application/json');
            
            schemaDataAccess.retrieveUser(request.params.id, function(err, user) {
                response.send(JSON.stringify(user));
            });
        });

        self.app.get('/users', function(request, response) {
            response.setHeader('Content-Type', 'application/json');
            
            schemaDataAccess.retrieveUsers(function(err, users) {
                response.send(JSON.stringify(users));
            });
        });

        self.app.post('/users', function(request, response) {
            console.log('creating a user ....');
            console.log(request.body);

            var user = schemaDataAccess.createUser(request.body);
            response.send(JSON.stringify(user));
        });

        self.app.post('/auth', function(request, response) {
            console.log('authenticating a user:');
            console.log(request.body);

            schemaDataAccess.retrieveUser(request.body.email, function(error, user) {
                console.log('found user:');
                console.log(user);

                if (user && (request.body.password == user[0].password))
                    response.send(JSON.stringify(user[0]));
                else
                    response.send(HttpStatus.UNAUTHORIZED, 'Invalid credentials!');
            });
        });

        self.app.put('/users/:id', function(request, response) {
            console.log('editing a user: ' + request.params.id);
            console.log(request.body);

            schemaDataAccess.editUser(request.body);
            response.send(HttpStatus.OK);
        });
    }

    self.createTeamRoutes = function() {

        self.app.get('/teams', function(request, response) {
            console.log('requesting teams ....');

            response.setHeader('Content-Type', 'application/json');
            
            schemaDataAccess.retrieveTeams(function(err, teams) {
                response.send(JSON.stringify(teams));
            });
        });

        self.app.get('/teams/:id', function(request, response) {
            console.log('requesting team: ' + request.params.id);

            response.setHeader('Content-Type', 'application/json');
            
            schemaDataAccess.retrieveTeam(request.params.id, function(err, team) {
                response.send(JSON.stringify(team));
            });
        });

        self.app.post('/teams', function(request, response) {
            var team = request.body;
            console.log('creating a team ....');
            console.log(team);

            schemaDataAccess.createTeam(team);
            // scheduleTeamVotesCount(team);
            response.send(HttpStatus.OK);
        });

        self.app.put('/teams/:id', function(request, response) {
            console.log('editing a team: ' + request.params.id);
            console.log(request.body);

            schemaDataAccess.editTeam(request.body);
            // scheduleTeamVotesCount(team);
            response.send(HttpStatus.OK);
        });
    }

    self.createRestaurantRoutes = function() {

        self.app.get('/restaurants', function(request, response) {
            console.log('requesting restaurants ....');

            response.setHeader('Content-Type', 'application/json');
            
            schemaDataAccess.retrieveRestaurants(function(err, restaurants) {
                response.send(JSON.stringify(restaurants));
            });
        });

        self.app.get('/restaurants/:id', function(request, response) {
            console.log('requesting restaurant: ' + request.params.id);

            response.setHeader('Content-Type', 'application/json');
            
            schemaDataAccess.retrieveRestaurant(request.params.id, function(err, restaurant) {
                response.send(JSON.stringify(restaurant));
            });
        });

        self.app.post('/restaurants', function(request, response) {
            console.log('creating a restaurant ....');
            console.log(request.body);

            schemaDataAccess.createRestaurant(request.body);
            response.send(HttpStatus.OK);
        });

        self.app.put('/restaurants/:id', function(request, response) {
            console.log('editing a restaurant: ' + request.params.id);
            console.log(request.body);

            schemaDataAccess.editRestaurant(request.body);
            response.send(HttpStatus.OK);
        });
    }
/*
    self.scheduleTeamsVotesCount = function(team) {

        schemaDataAccess.retrieveTeams(function(err, teams) {
            if (teams)
                teams.forEach(function(team) {
                    self.scheduleTeamVotesCount(team);
                });
        });
    }

    self.scheduleTeamVotesCount = function(team) {
        var pollCloseTime = moment.duration(team.lunchTime);
        var rule = new schedule.RecurrenceRule();
        rule.hour = pollCloseTime.hours();
        rule.minute = pollCloseTime.minutes();

        schedule.scheduleJob(rule, function(){

            // :o out of time to implement ...

            console.log('Verify voutes count and register restaurant choosen for the team today !');
        });
    }*/

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.app = express();
        self.createRoutes();
        // self.scheduleTeamsVotesCount();
    };


    /**
     *  Initializes the application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};


/**
 *  main():  Main code.
 */
var zapp = new RangoNowApp();
zapp.initialize();
zapp.start();

