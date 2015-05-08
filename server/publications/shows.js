Meteor.publish('show', function(showId) {
	check(showId, String);

	return Shows.find({_id: showId});
});

Meteor.publish('likedShows', function() {
	return Shows.find({upvoters: { $in: [this.userId] } });
});