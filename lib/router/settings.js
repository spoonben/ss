Router.route('settings', {
	path: '/:userName/settings',
	controller: 'settingsController'
});

settingsController = RouteController.extend({
	template: 'settings',

	waitOn: function() {
		return [
			Meteor.subscribe('user', this.params.userName)
		];
	},

	data: function() {
		return Meteor.users.findOne({username: userName});
	}
});