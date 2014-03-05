var target = null;
var clone = null;
var state = 0;

$(document).on('mousedown', '.move-button', function (e) {

	target = this.parentNode;
	clone = target.cloneNode(true);

	this.parentNode.parentNode.appendChild(clone);
	var initialWidth = $(clone).width();

	clone.style.top = e.clientY + 'px';
	clone.style.left = e.clientX + 'px';
	clone.style.width = initialWidth + 'px';
	clone.style.position = 'fixed';
	clone.classList.add('moving');

	target.classList.add('move-target');


	state = 1;

	$('.editable').removeAttr('contenteditable');
	$('body').css('user-select', 'none');
});

$(document).on('mouseup', function (e) {
	if (clone != null) {
		state = 0;
		$('.editable').attr('contenteditable', '');
		clone.style.position = 'relative';
		clone.style.top = 'auto';
		clone.style.left = 'auto';
		clone.style.width = '100%';
		clone.classList.remove('moving');
		target.classList.remove('move-target');
		clone.remove();
		$('body').css('user-select', 'text');
	}
});

$(document).on('mousemove', function (e) {
	if (state == 1 && clone != null) {
		clone.style.top = e.clientY + 'px';
		clone.style.left = e.clientX + 'px';

		var selected = $(e.target).parent('.editable-group.movable')[0];

		if (e.target.classList.contains('movable') &&
			e.target.classList.contains('editable-group'))
			selected = e.target;


		if (selected != null && selected != undefined) {

			console.log(selected);
			
			var offset = $(selected).offset().top;
			var height = $(selected).height();
			var mPos = e.clientY + $(window).scrollTop();

			if (mPos - offset < (offset + height) - mPos)
				$(target).insertBefore(selected);
			else
				$(target).insertAfter(selected);
		}
	}
});