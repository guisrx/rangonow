
// http://codereview.stackexchange.com/questions/28758/test-mongoose-model

/*
var user1 = new User({ name: 'dog1', email: 'dog@1', shouldReceiveNotification: true });
var user2 = new User({ name: 'dog2', email: 'dog@2', shouldReceiveNotification: false });
var user3 = new User({ name: 'dog3', email: 'dog@3', shouldReceiveNotification: true });

user1.save();
user2.save();
user3.save();

User.find({ email: 'dog@2' }, function (err, docs) {

    console.log('dogs:');
    console.log(docs);
});	




var vote1 = new Vote({ email: 'dog@1', restaurant: 'rest-01', team: 'team-01', day: new Date(2015, 7, 14) });
var vote2 = new Vote({ email: 'dog@1', restaurant: 'rest-02', team: 'team-01', day: new Date(2015, 7, 15) });
var vote3 = new Vote({ email: 'dog@1', restaurant: 'rest-03', team: 'team-01', day: new Date(2015, 7, 16) });

vote1.save();
vote2.save();
vote3.save();

Vote.find({'day': {'$gte': new Date(2015, 7, 15), '$lt': new Date(2015, 7, 16)}}, function (err, docs) {

    console.log('votes on day:');
    console.log(docs);
});	




var vote4 = new Vote({ email: 'dog@1', restaurant: 'rest-04', team: 'team-01', day: new Date(2015, 6, 14) });
var vote5 = new Vote({ email: 'dog@1', restaurant: 'rest-05', team: 'team-01', day: new Date(2015, 7, 15) });
var vote6 = new Vote({ email: 'dog@1', restaurant: 'rest-06', team: 'team-01', day: new Date(2015, 8, 16) });

vote4.save();
vote5.save();
vote6.save();

Vote.find({'day': {'$gte': new Date(2015, 7), '$lt': new Date(2015, 8)}}, function (err, docs) {

    console.log('votes on month:');
    console.log(docs);
});	
*/
