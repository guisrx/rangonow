#!/bin/env node

"use strict";

module.exports = function (mongoose) {

    var module = {};
	var db = mongoose.connection;
	var Schema = mongoose.Schema;

	var weekRestaurantsSchema = new Schema({
		restaurants: [Number],
		team: String,
		weekOfYear: Number,
		year: Number
	});

	var WeekRestaurants = db.model('WeekRestaurants', weekRestaurantsSchema);

	// methods
	var mongooseErrorCallback = function(error) { 
	  	if(error) {
	  		console.log('Mongoose got an error processing an entity!');
	    	console.log(error);
	    }
	}

	module.retrieveWeekRestaurants = function retrieveWeekRestaurants(weekOfYear, year, callback) {

		WeekRestaurants.find({ 'weekOfYear': weekOfYear, 'year': year }, function (error, weekRestaurants) {
	        mongooseErrorCallback(error);

		    callback(null, weekRestaurants);
		});	
	}

	module.createWeekRestaurant = function createWeekRestaurant(weekRestaurant, callback) {

		WeekRestaurants.find({ 'weekOfYear': weekRestaurant.weekOfYear, 'year': weekRestaurant.year, 'team': weekRestaurant.team }, 
			function (error, weekRestaurants) {
	        	mongooseErrorCallback(error);

				if (weekRestaurants.length > 0) {

					weekRestaurants.restaurant.push(weekRestaurant.restaurant);
				} else {

					weekRestaurants = new WeekRestaurants({ 	
						restaurants: [weekRestaurant.restaurant],
						team: weekRestaurant.team,
						weekOfYear: weekRestaurant.weekOfYear,
						year: weekRestaurant.year });
				}

				weekRestaurants.save(mongooseErrorCallback);	
		});	
	}

	module.cleanWeekRestaurantsSchema = function cleanWeekRestaurantsSchema() {

		WeekRestaurants.remove({}, function(error) { 
			mongooseErrorCallback(error);
	   		console.log('WeekRestaurants collection removed') 
		});
	}

	return module;
}
