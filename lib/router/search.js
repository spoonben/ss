Router.route('search', {
	path: '/search',
	controller: 'SearchController'
});

SearchController = RouteController.extend({
	template: 'searchTemplate',

	waitOn: function() {
		return [
			Meteor.subscribe('shows')
		];
	}
});