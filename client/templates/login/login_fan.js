Template.loginFan.events({
	//t param is the template itself
	'submit #loginFanForm': function(e, t) {
		e.preventDefault();
		var usernameVal = t.find('#loginFanUsername').value;
		var passwordVal = t.find('#loginFanPassword').value;

		Meteor.loginWithPassword(usernameVal, passwordVal, function(err){
			if(err) {
				$('#loginFanUsername').val('');
				$('#loginFanPassword').val('');

			} else if (Roles.userIsInRole(Meteor.userId(), 'Fan') === true) {
				Router.go('/explore');
			} else {
				Meteor.logout();
			}
		});
	}
});