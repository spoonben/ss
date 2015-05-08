Template.exploreArtistsName.helpers({
	artists: function() {
		return Meteor.users.find({roles: ['Artist']}, { sort: {'profile.name': 1} });
	}
});