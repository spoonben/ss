Meteor.publish('artist', function(artistName) {
	check(artistName, String);

	return Meteor.users.find({username: artistName});
});

Meteor.publish('artistShows', function(artistName) {
	check(artistName, String);

	return Shows.find({artistName: artistName});
});