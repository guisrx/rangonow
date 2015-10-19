#!/bin/env node

"use strict";

module.exports = function (mongoose) {

    var module = {};
	var db = mongoose.connection;
	var Schema = mongoose.Schema;

	var restaurantSchema = new Schema({
		name: String,
		price: Number
	});

	var Restaurant = db.model('Restaurant', restaurantSchema);

	// methods
	var mongooseErrorCallback = function(error) { 
	  	if(error) {
	  		console.log('Mongoose got an error processing an entity!');
	    	console.log(error);
	    }
	}

	module.createRestaurant = function createRestaurant(restaurantDTO) {

		var newRestaurant = new Restaurant({ name: restaurantDTO.name, 
								 			 price: restaurantDTO.price});
		newRestaurant.save(mongooseErrorCallback);
	}

	module.editRestaurant = function editRestaurant(restaurantDTO) {

		Restaurant.findById(restaurantDTO._id, function (err, restaurant) {

		 	if (restaurant) {
		 		restaurant.name = restaurantDTO.name;
				restaurant.price = restaurantDTO.price;
			}

			restaurant.save(mongooseErrorCallback);	
		 });	
	}

	module.retrieveRestaurants = function retrieveRestaurants(callback) {

		Restaurant.find({}, function (error, restaurants) {
	        mongooseErrorCallback(error);

		    callback(null, restaurants);
		});	
	}

	module.retrieveRestaurant = function retrieveRestaurant(restaurantId, callback) {

		Restaurant.findById(restaurantId, function (error, restaurant) {
	        mongooseErrorCallback(error);

		    callback(null, restaurant);
		});	
	}

	module.cleanRestaurantSchema = function cleanRestaurantSchema() {

		Restaurant.remove({}, function(error) { 
			mongooseErrorCallback(error);
	   		console.log('Restaurant collection removed') 
		});
	}

	return module;
}
