var target = null;
var clone = null;
var state = 0;

var selection = null;

var getSelection = function (e) {
	var result = (document.all) ? document.selection.createRange().text : document.getSelection();
	return result;
};

$(document).on('mousedown', '.move-button', function (e) {

	if (e.button == 0) {
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
		$('#speakers-section-edit .session-list').hide();
		$('body').css('user-select', 'none');
	}
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
		$('#speakers-section-edit .session-list').show();
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

$(document).on('click', '*', function (e) {
	if (selection == null || selection.anchorOffset - selection.focusOffset == 0) {
			

	}
});

$(document).on('mouseup, click', '.editable', function (e) {
	if (e.button == 0) {

		var _selection = getSelection(e);

		if (_selection.type != 'Range' || _selection.anchorOffset - _selection.focusOffset == 0) {
			
			$('#edit-context-menu').css({
				display: 'none'
			});
			
			selection = null;

		} else {
			
			if (_selection.type == 'Range')
				selection = jQuery.extend(true, {}, _selection);
			
			// console.log(selection);
			
			var popoverHeight = $('#edit-context-menu').height() + 31;
			var popoverMid = $('#edit-context-menu').width() / 2;
			
			$('#edit-context-menu').css({
				top: e.pageY - popoverHeight,
				left: e.pageX - popoverMid,
				display: 'block'
			});
		}

	} else {
		$('#edit-context-menu').css({
			display: 'none'
		});
	}
});

$(document).on('click', '.btn-insert-link', function (e) {
	var linkAddress = prompt('Please provide the link address:', 'http://www.example.com');
	
	var element = selection.anchorNode.parentElement;

	console.log(element);

	if (element) {
		var text = element.innerHTML;

		var offset = text.indexOf(selection.anchorNode.textContent);
		if (offset < 0) offset = 0;
		
		// console.log(offset);

		var lower = Math.min(selection.anchorOffset, selection.focusOffset) + offset;
		var upper = Math.max(selection.anchorOffset, selection.focusOffset) + offset;
		
		var originalSelection = text.substring(lower, upper);

		originalSelection = '<a href="' + linkAddress + '">' + originalSelection + '</a>';

		text = text.substring(0, lower) + originalSelection + text.substring(upper, text.length);

		// console.log(originalSelection);

		element.innerHTML = text;
	}
	
	e.preventDefault();
});