Template.registerFan.events({
	//t param is the template itself
	'submit form': function(e, t) {
		e.preventDefault();

		var usernameVal = t.find('#registerFanUsername').value;
		var emailVal = t.find('#registerFanEmail').value;
		var passwordVal = t.find('#registerFanPassword').value;
		var nameVal = t.find('#registerFanDisplay').value;
		var role = 'Fan';

		Meteor.call('createFan', usernameVal, emailVal, passwordVal, nameVal, role, function(err, result){
			if (err) {
				return throwError(err.reason);
			} else {
				Meteor.loginWithPassword(usernameVal, passwordVal);
				Router.go('explore');
			}
		});
	}
});

