Template.registerArtist.events({
	//t param is the template itself
	'submit form': function(e, t) {
		e.preventDefault();

		var usernameVal = t.find('#registerArtistUsername').value;
		var emailVal = t.find('#registerArtistEmail').value;
		var passwordVal = t.find('#registerArtistPassword').value;
		var nameVal = t.find('#registerArtistDisplay').value;
		var role = 'Artist';

		Meteor.call('createArtist', usernameVal, emailVal, passwordVal, nameVal, role, function(err, result){
			if (err) {
				return throwError(err.reason);
			} else {
				Meteor.loginWithPassword(usernameVal, passwordVal);
				Router.go('explore');
			}
		});
	}
});

