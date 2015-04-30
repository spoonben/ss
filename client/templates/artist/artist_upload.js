Template.uploadShow.events({
	//goes to the next step in the form need to do validation
	'click .upload__form-next': function(e) {
		var currentStep = $(e.target).parent();
		var nextStep = $(e.target).parent().next();
		var prevStep = $(e.target).parent().prev();

		//change the progress css
		$('.upload__progress li').eq($('.upload__form-step').index(nextStep)).addClass('is-active');

		//show the next step
		currentStep.hide();
		nextStep.show();
	},
	//goes to the previous step in the form
	'click .upload__form-prev': function(e,t) {
		var currentStep = $(e.target).parent();
		var previousStep = $(e.target).parent().prev();

		//de-activate-current step on progressbar
		$('.upload__progress li').eq($('.upload__form-step').index(currentStep)).removeClass('is-active');

		//show the previous step
		currentStep.hide();
		previousStep.show();
	},

	'click .upload__close': function(e,t) {
		t.$('.upload').fadeOut();
	}
});

//Prevents Some Ugly
Template.uploadShow.rendered = function() {
	$(window).on('resize', function(){
		$('.upload__inner').css('max-height', window.innerHeight - 203 + "px");
	}).resize();

	$(document).on('keydown', function(e) {
		if(e.keyCode === 27) {
			$('.upload').fadeOut();
		}
	});
};