Router.configure({
	layoutTemplate: 'appLayout'
});

Router.route('/login', {
	name: 'login',
	template: 'login',
	layoutTemplate: 'loginLayout'
});

Router.route('/', {
	name: 'home',
	action: function() {
		this.redirect('/explore')
	}
});

Router.route('/explore', {
	name: 'explore',
	template: 'exploreTemplate'
});

Router.route('/library', {
	name: 'library',
	template: 'libraryTemplate'
});

Router.route('/feed', {
	name: 'feed',
	template: 'feedTemplate'
});