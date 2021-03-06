Router.route('artist', {
	path: '/artist/:userName',
	controller: 'ArtistController'
});

ArtistController = RouteController.extend({
	template: 'artistTemplate',

	waitOn: function() {
		return [
			Meteor.subscribe('artist', this.params.userName),
			Meteor.subscribe('artistShows', this.params.userName)
		];
	},

	data: function() {
		return Meteor.users.findOne({username: this.params.userName});
	},

	onBeforeAction: function() {
		if(Meteor.user().username === this.params.userName) {
			//if the user has the same name as the artist in the url, show the upload controlls
			this.render('uploadButton', {to: 'upload-button'});
			this.render('uploadShow', {to: 'upload-show'});
			this.render('profilePhotoBtn', {to: 'change-profPic'});
			this.next();
		} else {
			this.render('profileFollowBtn', {to: 'follow-button'});
			this.next();
		}
	}
});