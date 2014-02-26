$('nav ul li a, nav ul li span').click(function(e){
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 300);
    e.preventDefault();
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