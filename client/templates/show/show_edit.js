Template.editShow.events({
	'click .show__edit-deleteBtn': function(e,t) {
		$('.delete').fadeIn();
	},

	'click .delete__close': function(e,t) {
		$('.delete').fadeOut();
	},

	'click .show__edit-back': function(e,t) {
		e.preventDefault();

		window.history.back();
	}
});

Template.editShow.rendered = function() {
	$(document).on('keydown', function(e) {
		if(e.keyCode === 27) {
			$('.delete').fadeOut();
		}
	});

	var editDatePicker = new Pikaday({	
		field: $('#show-edit-date')[0],
		format: 'l'
	});

	$('#show-edit-date').on('keydown', function(e){
		return false;
	});
};