$('nav ul li a, nav ul li span, ul.nav li span, ul.nav li a').click(function(e){
    document.querySelector('.alternative-navigation').style.display = 'none';
    altMenuState = 0;
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 300);
    e.preventDefault();
    return false;
});

// $('.cover').click(function (e) {
// 	var description = document.createElement('div');
// 	description.classList.add('description');

// 	this.parentNode.parentNode.parentNode.insertBefore(description, this.parentNode.parentNode.nextSibling);

// 	description.classList.add('description-final');
// });

var altMenuState = 0;

$('.alternative-trigger').click(function (e) {
	console.log(altMenuState);
	if (altMenuState == 0) {
		document.querySelector('.alternative-navigation').style.display = 'block';
		altMenuState = 1;
	} else {
		document.querySelector('.alternative-navigation').style.display = 'none';
		altMenuState = 0;
	}
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