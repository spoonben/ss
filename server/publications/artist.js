Meteor.publish('artist', function(artistName) {
	check(artistName, String);

	return Meteor.users.find({username: artistName});
});

//pubs all artists alphabetically
Meteor.publish('artists', function() {
	return Meteor.users.find({roles: ['Artist']}, { sort: {'profile.name': 1} });
});

//artist profile shows
Meteor.publish('artistShows', function(artistName) {
	check(artistName, String);

	return Shows.find({artist: artistName});
});

//explore pubs
Meteor.publish('artistsTop', function() {
	return Meteor.users.find({ roles: ['Artist'] }, { sort: {'profile.score': 1} });
});

Meteor.publish('artistsPlays', function() {
	return Meteor.users.find({ roles: ['Artist'] }, { sort: {'profile.plays': 1} });
});