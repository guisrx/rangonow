#!/bin/env node

"use strict";

module.exports = function (mongoose, restaurantSchema) {

    var module = {};
	var db = mongoose.connection;
	var Schema = mongoose.Schema;

	var voteSchema = new Schema({
		user: String,
		restaurant: String,
		day: Date,
		team: String,
		price: Number
	});

	var Vote = db.model('Vote', voteSchema);

	// methods
	var mongooseErrorCallback = function(error) { 
	  	if(error) {
	  		console.log('Mongoose got an error processing an entity!');
	    	console.log(error);
	    }
	}

	module.createVote = function createVote(voteDTO) {

	    restaurantSchema.retrieveRestaurant(voteDTO.restaurant, 
	    	function(error, restaurant) {

				var newVote = new Vote({ user: voteDTO.user,
										 restaurant: voteDTO.restaurant,
										 day: new Date(),
							 			 team: voteDTO.team,
							 			 price: restaurant.price });

				newVote.save(mongooseErrorCallback);

				console.log('new vote');
				console.log(newVote);
		    });
	}

	module.retrieveUserVoteToday = function retrieveUserVoteToday(user, callback) {
		var today = new Date();

		Vote.find({ 'user': user, 'day': { '$gte': new Date(today.getFullYear(), today.getMonth(), today.getDate()), 
							               '$lt': new Date(today.getFullYear(), today.getMonth(), today.getDate() +1) } }, 
		    function (error, votes) {
		        mongooseErrorCallback(error);

			    callback(null, votes);
		});	
	}

	module.retrieveTodayVotes = function retrieveTodayVotes(callback) {
		var today = new Date();

		Vote.find({ 'day': { '$gte': new Date(today.getFullYear(), today.getMonth(), today.getDate()), 
							 '$lt': new Date(today.getFullYear(), today.getMonth(), today.getDate() +1) } }, 
		    function (error, votes) {
		        mongooseErrorCallback(error);

			    callback(null, votes);
		});	
	}

	module.cleanVoteSchema = function cleanVoteSchema() {

		Vote.remove({}, function(error) { 
			mongooseErrorCallback(error);
	   		console.log('Vote collection removed') 
		});
	}

	return module;
}
