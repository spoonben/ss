Template.artistTemplate.rendered = function() {
	$(window).on('resize', function() {
  	var picWidth = $('.artist__photo').width();
  	$('.artist__photo').css('height', picWidth + 'px');
  }).resize();
};