Router._filters = {
	requireLogin: function() {
	  if (! Meteor.user()) {
      this.redirect('login');
      this.next();
	  } else {
	    this.next();
	  }
	},

	isLoggedIn: function() {
		if(Meteor.user()) {
			this.redirect('/');
			this.next();
		} else {
			this.next();
		}
	}
};

//Better names the filters
filters = Router._filters;

Meteor.startup(function(){

	if (Meteor.isClient) {

		//Before Hooks
		Router.onBeforeAction(filters.requireLogin);
		Router.onBeforeAction(filters.isLoggedIn, {only: ['login']});
		Router.onBeforeAction('dataNotFound', {only: ['artist', 'fan']});
	}

});