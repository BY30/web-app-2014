$('a span').click(function(){
	console.log($.attr($(this).parent()[0], 'href'));
    $('html, body').animate({
        scrollTop: $($.attr($(this).parent()[0], 'href')).offset().top - 100
    }, 300);
    return false;
});

var checkScroll = function (e) {
	if (window.scrollY >= 600) {
		document.querySelector('nav').style.position = 'fixed';
		document.querySelector('.nav-wrapper').style.position = 'fixed';
		document.querySelector('.nav-wrapper').style.opacity = '.95';
	} else {
		document.querySelector('nav').style.position = 'absolute';
		document.querySelector('.nav-wrapper').style.position = 'absolute';
		document.querySelector('.nav-wrapper').style.opacity = '.3';
	}
};

window.addEventListener('scroll', checkScroll, false);