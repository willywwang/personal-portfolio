function resizeHeader() {
	var headerWidth = $('.header').width();
	$('#divHeaderLogo').css('width', headerWidth);
};

$(document).ready(function(){
  $('.scrollAnimation').on('click', function(event) {
   if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    var offset = 0;

    if ($('.header-phone').is(':visible')) {
      offset = 45;
    }

    $('html, body').animate({
     scrollTop: $(hash).offset().top - offset
   }, 900);

    window.location.hash = '';
  }
});

  resizeHeader();
});
