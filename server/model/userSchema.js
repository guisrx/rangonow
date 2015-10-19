#!/bin/env node

"use strict";

module.exports = function (mongoose) {

    var module = {};
	var db = mongoose.connection;
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		name: String,
		email: String,
		password: String,
		enabled: Boolean,
		token: String,
		shouldReceiveNotification: Boolean
	});

	var User = db.model('User', userSchema);

	// methods
	var mongooseErrorCallback = function(error) { 
	  	if(error) {
	  		console.log('Mongoose got an error processing an entity!');
	    	console.log(error);
	    }
	}

	function generateToken() {
	    var d = new Date().getTime();
	    var token = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return token;
	}

	module.createUser = function createUser(userDTO) {

		var newUser = new User({ name: userDTO.name, 
								 email: userDTO.email, 
								 password: userDTO.password,
								 enabled: true,
								 token: generateToken(),
								 shouldReceiveNotification: userDTO.shouldReceiveNotification});

		newUser.save(mongooseErrorCallback);

		return newUser;
	}

	module.retrieveUser = function retrieveUser(email, callback) {

		User.find({ 'email': email }, function (error, user) {
	        mongooseErrorCallback(error);

		    callback(null, user);
		});	
	}

	module.retrieveUsers = function retrieveUsers(callback) {

		User.find({}, function (error, users) {
	        mongooseErrorCallback(error);

		    callback(null, users);
		});	
	}

	module.editUser = function editUser(userDTO) {

		User.findById(userDTO._id, function (err, user) {

		 	if (user) {
		 		user.name = userDTO.name;
				user.password = userDTO.password;
				user.enabled = userDTO.enabled;
				user.shouldReceiveNotification = userDTO.shouldReceiveNotification;
			}

			user.save(mongooseErrorCallback);	
		 });	
	}

	module.cleanUserSchema = function cleanUserSchema() {

		User.remove({}, function(error) { 
			mongooseErrorCallback(error);
	   		console.log('User collection removed') 
		});
	}

	return module;
}
