function resizeHeader() {
	var headerWidth = $('.header').width();
	$('#divHeaderLogo').css('width', headerWidth);
};

$(document).ready(function(){
      $('.scrollAnimation').on('click', function(event) {
       if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;

        $('html, body').animate({
         scrollTop: $(hash).offset().top
       }, 900);

        window.location.hash = '';
      }
    });

	resizeHeader();
});
