Template.exploreArtistsPlays.helpers({
	artists: function() {
		return Meteor.users.find({ roles: ['Artist'] }, { sort: {'profile.plays': -1} });
	}
});