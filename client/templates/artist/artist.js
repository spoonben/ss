//helpers
// Template.artistTemplate.helpers({
// 	shows: function() {
// 		return Shows.find({artistName: })
// 	},

// 	showsCount: function() {
// 		return Shows.find({artistName: })
// 	}
// });


//events
// Tempalte.artistTemplate.events({
	
// });


//jquery after render
Template.artistTemplate.rendered = function() {
	$(window).on('resize', function() {
  	var picWidth = $('.artist__photo').width();
  	$('.artist__photo').css('height', picWidth + 'px');
  }).resize();
};