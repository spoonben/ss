Router.route('library', {
	path: '/library',
	controller: 'LibraryController'
});

LibraryController = RouteController.extend({
	template: 'libraryTemplate',

	waitOn: function() {
		return [
			Meteor.subscribe('likedShows'),
			Meteor.subscribe('artists')
		];
	},

	data: function() {
		return Meteor.users.findOne(Meteor.userId());
	}
});