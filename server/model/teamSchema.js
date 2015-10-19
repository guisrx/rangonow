#!/bin/env node

"use strict";

var moment = require('moment');
require("moment-duration-format");

module.exports = function (mongoose) {

    var module = {};
	var db = mongoose.connection;
	var Schema = mongoose.Schema;

	var teamSchema = new Schema({
		name:  String,
		lunchTime: Number,
		pollCloseTime: Number,
		timeZone: Number,
		adminUser: String
	});

	var Team = db.model('Team', teamSchema);

	// methods
	var mongooseErrorCallback = function(error) { 
	  	if(error) {
	  		console.log('Mongoose got an error processing an entity!');
	    	console.log(error);
	    }
	}

	module.createTeam = function createTeam(teamDTO) {

		var lunchTime = moment.duration(teamDTO.lunchTime).asMinutes();
		var pollCloseTime = moment.duration(teamDTO.pollCloseTime).asMinutes();

		console.log('lunchTime: ' + lunchTime);
		console.log('pollCloseTime: ' + pollCloseTime);

		var newTeam = new Team({ name: teamDTO.name, 
								 lunchTime: lunchTime, 
								 pollCloseTime: pollCloseTime,
								 timeZone: teamDTO.timeZone,
					 			 adminUser: teamDTO.adminUser});
		newTeam.save(mongooseErrorCallback);
	}

	module.editTeam = function editTeam(teamDTO) {

		Team.findById(teamDTO._id, function (err, team) {

			var lunchTime = moment.duration(teamDTO.lunchTime).asMinutes();
			var pollCloseTime = moment.duration(teamDTO.pollCloseTime).asMinutes();

		 	if (team) {
		 		team.name = teamDTO.name;
				team.lunchTime = lunchTime;
				team.pollCloseTime = pollCloseTime;
				team.timeZone = teamDTO.timeZone;
			}

			team.save(mongooseErrorCallback);	
		 });	
	}

	module.retrieveTeams = function retrieveTeams(callback) {

		Team.find({}, function (error, teams) {
	        mongooseErrorCallback(error);

	        var teamsDTO = [];
	        teams.forEach(function(team) {

	        	teamsDTO.push({
	        		_id: team._id,
	    			name: team.name,
					lunchTime: moment.duration(team.lunchTime, 'minutes').format("HH:mm"),
					pollCloseTime: moment.duration(team.pollCloseTime, 'minutes').format("HH:mm"),
					timeZone: team.timeZone,
					adminUser: team.adminUser
	        	});
	        });

		    callback(null, teamsDTO);
		});	
	}

	module.retrieveTeam = function retrieveTeam(teamId, callback) {

		Team.findById(teamId, function (error, team) {
	        mongooseErrorCallback(error);

	        console.log(team);

	        var teamDTO = {
				_id: team._id,
				name: team.name,
				lunchTime: moment.duration(team.lunchTime, 'minutes').format("HH:mm"),
				pollCloseTime: moment.duration(team.pollCloseTime, 'minutes').format("HH:mm"),
				timeZone: team.timeZone,
				adminUser: team.adminUser
	       	};

		    callback(null, teamDTO);
		});	
	}

	module.cleanTeamSchema = function cleanTeamSchema() {

		Team.remove({}, function(error) { 
			mongooseErrorCallback(error);
	   		console.log('Team collection removed') 
		});
	}

	return module;
}
