Router.route('settings', {
	path: '/settings/:username',
	controller: 'settingsController'
});

settingsController = RouteController.extend({
	template: 'settings',

	waitOn: function() {
		return [
			Meteor.subscribe('currentUser')
		];
	},

	data: function() {
		return Meteor.users.findOne({username: this.params.userName});
	}
});