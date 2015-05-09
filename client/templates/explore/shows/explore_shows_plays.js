Template.exploreShowsPlays.helpers({
	shows: function() {
		return Shows.find({}, { sort: { plays: -1 } });
	}
});