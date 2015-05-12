Template.login.events({
	//Tab control
	'click .login__header-nav-item': function(e) {
		$('.login__header-nav-item').removeClass('is-active');
		$(e.target).parent().addClass('is-active');
		var tabNumber = $(e.target).parent().attr('id').split('loginTab')[1];
		$('.login__content').removeClass('is-active');
		$('#login-content' + tabNumber).addClass('is-active');
	},

	//Switches around the Sign In Forms
	'click .login__fan--to-artist': function() {
		$('.login__fan').hide();
		$('.login__artist').fadeIn();
		$('.login').css('background-image', 'url("/images/artistBg.png")');
	},

	'click .login__artist--to-fan': function() {
		$('.login__artist').hide();
		$('.login__fan').fadeIn();
		$('.login').css('background-image', 'url("/images/fanBg.png")');
	},

	//shows the Join forms
	'click #register-fan': function() {
		$('.join__fan').fadeIn();
	},

	'click .login__content-copy-join': function() {
		$('.join__fan').fadeIn();
	},

	'click #register-artist': function() {
		$('.join__artist').fadeIn();
	},

	'click .join__fan-close': function() {
		$('.join__fan').fadeOut();
	},

	'click .join__artist-close': function() {
		$('.join__artist').fadeOut();
	}

	//close the overlay w esc
	// 'keydown document': function(e) {
	// 	if(e.keyCode === 27) {
	// 		$('.join__fan').fadeOut();
	// 		$('.join__artist').fadeOut();
	// 	}
	// }
	
});
