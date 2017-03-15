(function($) {

	// Trigger function on DomReady
	$(document).ready(function() {
		timelineColorToggle();
		
		// Trigger window.scroll, this will initiate some of the scripts
		$(window).scroll();
	});
	
	// Timeline Magic
	function timelineColorToggle() {

		var sections = $('section.content-section').reverse(),
			timelineWrapper = $('.timeline-wrapper'),
			halfScreen = $(window).height() / 2;
			docHeight = $(document).height();
			
		// Timeline scroll function
		$(window).on('scroll resize', function() {

			delay(function() {

				var currScroll = $(window).scrollTop() > $(document).scrollTop() ? $(window).scrollTop() : $(document).scrollTop(),
					scrollSplit = currScroll + halfScreen;
				
				sections.removeClass('active').each(function() {

					var section = $(this),
						postOffset = section.offset().top;

					if(scrollSplit > postOffset) {

						// Add active class to fade in
						section.addClass('active')

						// Get section color
						var color = section.data('timeline-color') ? section.data('timeline-color') : null,
							allColors = 'color-green color-yellow color-crimson color-purple color-blue color-dark color-orange'

						timelineWrapper.removeClass(allColors);

						if(color !== null) {
							timelineWrapper.addClass('color-' + color);
						}

						return false;
					}

				});
				
			}, 20);

		});

	}

})(jQuery);


/*==========  Helpers  ==========*/

// Timeout function
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})();

// Reverse function
$.fn.reverse = function() {
	return this.pushStack(this.get().reverse(), arguments);
};