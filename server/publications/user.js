Meteor.publish('user', function(userName) {
	check(userName, String);

	Meteor.users.findOne({userName: userName});
});