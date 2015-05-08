Template.exploreArtistsTop.helpers({
	artists: function() {
		return Meteor.users.find({ roles: ['Artist'] }, { sort: {'profile.score': -1} });
	}
});
