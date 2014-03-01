var generateEditableGroup = function (type) {
	var editableGroup = document.createElement('div');
	editableGroup.classList.add('editable-group');

	var editableElement = document.createElement(type);
	editableElement.classList.add('editable');

	if (type === 'h2') {
		editableElement.classList.add('heading');
		editableElement.innerHTML = 'Brand new heading! Click here to edit...';
	}
	else {
		editableElement.classList.add('content');
		editableElement.innerHTML = 'Brand new paragraph! Click here to edit...';
	}

	editableElement.setAttribute('contenteditable', '');

	var removeButton = document.createElement('span');
	removeButton.classList.add('glyphicon');
	removeButton.classList.add('glyphicon-remove-circle');
	removeButton.classList.add('pull-right');
	removeButton.classList.add('remove-button');

	editableGroup.appendChild(editableElement);
	editableGroup.appendChild(removeButton);

	return editableGroup;
};

var enableModifiedNotification = function (element) {
	var target = element.getAttribute('notification-area');
	var saveButtonIcon = document.querySelector('#' + element.parentNode.parentNode.id + ' .btn-save .btn-icon');
	var saveButtonContent = document.querySelector('#' + element.parentNode.parentNode.id + ' .btn-save .btn-content');

	$(target + ' .saved').hide();
	$(target + ' .modified').show();

	saveButtonContent.innerHTML = 'Save';
	saveButtonIcon.classList.remove('glyphicon-saved');
	saveButtonIcon.classList.add('glyphicon-save');

	saveButtonContent.parentNode.classList.remove('disabled');
};

var clearModifiedNotification = function (element) {
	var target = element.getAttribute('notification-area');
	var saveButtonIcon = document.querySelector('#' + element.parentNode.parentNode.id + ' .btn-save .btn-icon');
	var saveButtonContent = document.querySelector('#' + element.parentNode.parentNode.id + ' .btn-save .btn-content');

	$(target + ' .modified').hide();
	$(target + ' .saved').show();

	saveButtonContent.innerHTML = 'Saved';
	saveButtonIcon.classList.remove('glyphicon-save');
	saveButtonIcon.classList.add('glyphicon-saved');

	saveButtonContent.parentNode.classList.add('disabled');
}

var toggleErrorsNotification = function (element, state) {
	var target = element.getAttribute('notification-area');
	var saveButton = document.querySelector('#' + element.parentNode.parentNode.id + ' .btn-save');

	if (state) {
		$(target + ' .error').show();
		saveButton.classList.add('disabled');
	} else {
		$(target + ' .error').hide();
		saveButton.classList.remove('disabled');
	}
};

var checkErrors = function (context) {
	var elements = document.querySelectorAll('#' + context + ' .editable');
	var result = false;

	if (elements.length == 0) return true;

	for (var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML.length == 0) {
			result = true;
			elements[i].classList.add('danger');
		} else {
			elements[i].classList.remove('danger');
		}
	};

	return result;
};

var pushUpdates = function (data, cb) {
	console.log('da');
	$.ajax({
		type: 'post',
		url: '/update',
		data: data,
		success: function (data, err) {
			console.log(data);
			cb();
		}
	});
};

$(document).on('DOMSubtreeModified', '.section-edit', function (e) {
	
	enableModifiedNotification(this);

	var errorsFound = checkErrors(this.id);
	toggleErrorsNotification(this, errorsFound);
});

$(document).on('click', '.btn-add-heading', function (e) {
	var element = generateEditableGroup('h2');
	var target = this.parentNode.getAttribute('for');

	document.querySelector(target).appendChild(element);
});

$(document).on('click', '.btn-add-paragraph', function (e) {
	var element = generateEditableGroup('p');
	var target = this.parentNode.getAttribute('for');

	document.querySelector(target).appendChild(element);
});

$(document).on('click', '.remove-button', function (e) {
	this.parentNode.remove();
});

$(document).on('click', '.btn-save', function (e) {
	var target = this.parentNode.getAttribute('for');
	var targetElement = document.querySelector(target);

	var data = new Object();
	data.section = targetElement.getAttribute('section');
	data.elements = new Array();

	var elems = document.querySelectorAll(target + ' .editable');
	for (var i = 0; i < elems.length; i++) {
		var element = new Object();
		element.type = elems[i].tagName.toLowerCase();
		element.content = elems[i].innerHTML;

		data.elements.push(element);
	};

	this.classList.add('disabled');
	this.querySelector('.btn-content').innerHTML = 'Saving...';

	pushUpdates(data, function () {
		clearModifiedNotification(targetElement);
	});
});

$('.editable').on('paste', function (e) {
	e.preventDefault();
	document.execCommand('inserttext', false, prompt('Paste something.'));
});