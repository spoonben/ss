Template.exploreShowsTop.helpers({
	shows: function() {
		return Shows.find({}, { sort: { score: -1 } });
	}
});