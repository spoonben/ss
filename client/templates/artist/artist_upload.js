Template.uploadShow.events({
	//goes to the next step in the form
	'click .upload__form-next': function(e) {
		var currentStep = $(e.target).parent(),
				nextStep = $(e.target).parent().next(),
				prevStep = $(e.target).parent().prev();

		//change the progress css
		$('.upload__progress li').eq($('.upload__form-step').index(nextStep)).addClass('is-active');

		//show the next step
		currentStep.hide();
		nextStep.show();
	}
});

//Prevents Some Ugly
Template.uploadShow.created = function() {
		$(window).on('resize', function(){
			$('.upload__inner').css('max-height', window.innerHeight - 203 + "px");
		})

		$(window).trigger('resize');
};