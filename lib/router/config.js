Router.configure({
	layoutTemplate: 'appLayout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.route('login', {
	path: '/login',
	template: 'login',
	layoutTemplate: 'loginLayout'
});

Router.route('home', {
	path: '/',
	action: function() {
		this.redirect('/explore/artists')
	}
});

Router.route('feed', {
	path: '/feed',
	template: 'feedTemplate'
});

Router.route('fan', {
	path: '/fan/:fanName',
	template: 'fanTemplate'
});