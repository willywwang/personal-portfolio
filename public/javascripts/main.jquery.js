function resizeHeader() {
	var headerWidth = $('.header').width();
	$('#divHeaderLogo').css('width', headerWidth);
};

$(document).ready(function(){
	$(function(){
		$("#landing-descriptors").typed({
			strings: ['Computer Science Student', 'Web Development', 'Android Development', 'Colliegiate eSports', 'Customer Support', 'Computer Builder'],
			typeSpeed: 50,
			backSpeed: 25,
			backDelay: 300,
			loop: true,
			loopCount: null,
			cursorChar: null,
		});
	});

	resizeHeader();
});
