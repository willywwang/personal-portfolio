function resizeHeader() {
	var headerWidth = $('.header').width();
	$('#divHeaderLogo').css('width', headerWidth);
};

$(document).ready(function(){
  resizeHeader();
});
