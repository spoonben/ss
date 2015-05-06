Router.route('editShow', {
	path: '/shows/:_id/edit',
	controller: 'EditShowController'
});

EditShowController = RouteController.extend({
	template: 'editShow',

	waitOn: function() {
		return [
			Meteor.subscribe('show', this.params._id)
		];
	},

	data: function() {
		return Shows.findOne({_id: this.params._id});
	}
});