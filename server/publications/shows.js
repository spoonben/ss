Meteor.publish('show', function(showId) {
	check(showId, String);

	return Shows.find({_id: showId});
});

Meteor.publish('shows', function(){
	return Shows.find({}, { sort: { score: -1 } });
});

Meteor.publish('showsPlays', function() {
	return Shows.find({}, { sort: { plays: -1 } });
});

Meteor.publish('likedShows', function() {
	return Shows.find({upvoters: { $in: [this.userId] } });
});