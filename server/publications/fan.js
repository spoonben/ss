Meteor.publish('fan', function(fanName) {
	check(fanName, String);

	return Meteor.users.find({username: fanName});
});