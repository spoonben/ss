Template.registerArtist.events({
	//t param is the template itself
	'submit form': function(e, t) {
		e.preventDefault();

		var usernameVal = trimInput(t.find('#registerArtistUsername').value);
		var emailVal = trimInput(t.find('#registerArtistEmail').value);
		var passwordVal = t.find('#registerArtistPassword').value;
		var nameVal = t.find('#registerArtistDisplay').value;
		var role = 'Artist';

		if (!usernameRegex.test(usernameVal)) {
			alert('Usernname must be greater than 3 characters and less than 24');
		} else if (!isValidPassword(passwordVal)) {
			alert('Password must be greater than 6 characters.');
		} else {
			Meteor.call('createArtist', usernameVal, emailVal, passwordVal, nameVal, role, function(err, result){
				if (err) {
					alert(err.reason);
				} else {
					Meteor.loginWithPassword(usernameVal, passwordVal);
					Router.go('explore');
				}
			});
		}
	}
});

