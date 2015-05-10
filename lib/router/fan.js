Router.route('fan', {
	path: '/fan/:userName',
	controller: 'FanController'
});

FanController = RouteController.extend({
	template: 'fanTemplate',

	waitOn: function() {
		return [
			Meteor.subscribe('fan', this.params.userName)
		];
	},

	data: function() {
		return Meteor.users.findOne({username: this.params.userName});
	},

	onBeforeAction: function() {
		if(Meteor.user().username === this.params.userName) {
			//if the user has the same name as the artist in the url, show the upload controlls
			this.render('profilePhotoBtn', {to: 'change-profPic'});
			this.next();
		} else {
			this.render('profileFollowBtn', {to: 'follow-button'});
			this.next();
		}
	}
});