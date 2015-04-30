Template.showTemplate.events({
	'mouseenter .show': function(e,t) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		var $showActions = $('.show').find($('.show__actions'));
		var animationName = 'animated fadeIn';

		$showActions.addClass(animationName).one(animationEnd, function() {
			$showActions.removeClass(animationName);
		});
	}
});

Template.showTemplate.rendered = function() {
	$(window).on('resize', function() {
  	var picWidth = $('.artist__photo').width();
  	var showWidth = $('.show').width();

  	$('.artist__photo').css('height', picWidth + 'px');
    $('.show').css({'height':showWidth+'px'});
  }).resize();
};