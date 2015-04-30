Meteor.publish('artist', function(artistName) {
	check(artistName, String);

	return Meteor.users.find({username: artistName});
});