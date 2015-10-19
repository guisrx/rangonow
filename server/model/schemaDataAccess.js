#!/bin/env node

"use strict";

// dependencies
var mongoose = require('mongoose');
var util = require('util');

// attributes
var mongoURI = 'mongodb://localhost:27017/test';

if (process.env.OPENSHIFT_MONGODB_DB_HOST) {

	var mongoServer = process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT;
	var mongoDB = process.env.OPENSHIFT_APP_NAME;
	var mongoUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
	var mongoPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;

	mongoURI = 'mongodb://' + mongoUser + ':' + mongoPass + '@' + mongoServer + '/' + mongoDB;

	console.log('using open shift mongo');
	console.log(mongoURI);
} else {
	console.log('using local mongo');
}

mongoose.connect(mongoURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var restaurantSchema = require('./restaurantSchema')(mongoose);
var teamSchema = require('./teamSchema')(mongoose);
var userSchema = require('./userSchema')(mongoose);
var voteSchema = require('./voteSchema')(mongoose, restaurantSchema);
var weekRestaurantsSchema = require('./weekRestaurantsSchema')(mongoose);


// methods
function cleanMongooseSchema() {

	restaurantSchema.cleanRestaurantSchema();
	teamSchema.cleanTeamSchema();
	userSchema.cleanUserSchema();
	voteSchema.cleanVoteSchema();
	weekRestaurantsSchema.cleanWeekRestaurantsSchema();
}

function mongooseConnectionSerialized() {
	return util.inspect(db, { showHidden: true, depth: 3 });
}	

// public members
module.exports = {

	mongooseConnectionSerialized: mongooseConnectionSerialized,

	createUser: userSchema.createUser,
	retrieveUser: userSchema.retrieveUser,
	retrieveUsers: userSchema.retrieveUsers,
	editUser: userSchema.editUser,

	createRestaurant: restaurantSchema.createRestaurant,
	editRestaurant: restaurantSchema.editRestaurant,
	retrieveRestaurants: restaurantSchema.retrieveRestaurants,
	retrieveRestaurant: restaurantSchema.retrieveRestaurant,

	createTeam: teamSchema.createTeam,
	editTeam: teamSchema.editTeam,
	retrieveTeam: teamSchema.retrieveTeam,
	retrieveTeams: teamSchema.retrieveTeams,
	
	createVote: voteSchema.createVote,
	retrieveUserVoteToday: voteSchema.retrieveUserVoteToday,
	retrieveTodayVotes: voteSchema.retrieveTodayVotes,

	cleanMongooseSchema: cleanMongooseSchema
}
