Router.route('artist', {
	path: '/artist/:artistName',
	controller: 'ArtistController'
	// waitOn: function(){
	// 	return Meteor.subscribe('artist');	
	// }
});


ArtistController = RouteController.extend({
	template: 'artistTemplate',

	waitOn: function() {
		return Meteor.subscribe('artist', this.params.artistName);
	},

	data: function() {
		return Meteor.users.findOne({username: this.params.artistName});
	},

	onBeforeAction: function() {
		if(Meteor.user().username === this.params.artistName) {
			//if the user has the same name as the artist in the url, show the upload controlls
			this.render('uploadButton', {to: 'upload-button'});
			this.render('uploadShow', {to: 'upload-show'});
			this.next();
		} else {
			this.next();
		}
	}
});