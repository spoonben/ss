Template.loginArtist.events({
	//t param is the template itself
	'submit #loginArtistForm': function(e, t) {
		e.preventDefault();

		var usernameVal = t.find('#loginArtistUsername').value;
		var passwordVal = t.find('#loginArtistPassword').value;

		Meteor.loginWithPassword(usernameVal, passwordVal, function(err){
			if(err) {
				//throw error code
				alert(err.reason);
				$('#loginArtistUsername').val('');
				$('#loginArtistPassword').val('');
			} else if (Roles.userIsInRole(Meteor.userId(), 'Artist') === true) {
				Router.go('/explore');
			} else {
				Meteor.logout();
			}
		});
	}
});