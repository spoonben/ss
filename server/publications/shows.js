Meteor.publish('show', function(showId) {
	check(showId, String);

	return Shows.find({_id: showId});
});