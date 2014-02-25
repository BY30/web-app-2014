$('a span').click(function(){
	console.log($(this).parent()[0]);
    $('html, body').animate({
        scrollTop: $( $.attr($(this).parent()[0], 'href') ).offset().top
    }, 300);
    return false;
});