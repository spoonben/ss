if(Meteor.isClient){

	Template.loginArtist.events({
		//t param is the template itself
		'submit form': function(e, t) {
			e.preventDefault();

			var usernameVal = t.find('#loginArtistUsername').value;
			var passwordVal = t.find('#loginArtistPassword').value;

			Meteor.loginWithPassword(usernameVal, passwordVal);

			Router.go('explore');

		}
	});

}