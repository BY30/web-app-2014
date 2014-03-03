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

var generateTeamMemberGroup = function () {
	var teamMemberData = document.createElement('div');
	teamMemberData.classList.add('team-member-data');
	teamMemberData.classList.add('editable-group');
	teamMemberData.id = 'm' + Date.now();

	var memberInfo = document.createElement('div');
	memberInfo.classList.add('member-info');

	var memberPhoto = document.createElement('div');
	memberPhoto.classList.add('member-photo');

	var inputElement = document.createElement('input');
	inputElement.setAttribute('type', 'file');
	inputElement.setAttribute('name', 'member-photo');
	inputElement.classList.add('hidden');
	inputElement.classList.add('photo-input');

	var photoPreview = document.createElement('img');
	photoPreview.setAttribute('src', 'images/default_photo.png');
	photoPreview.setAttribute('for', '#' + teamMemberData.id);
	photoPreview.classList.add('preview');
	photoPreview.classList.add('btn-add-photo');

	memberPhoto.appendChild(inputElement);
	memberPhoto.appendChild(photoPreview);

	var editableGroup = document.createElement('div');
	editableGroup.classList.add('editable-group');

	var memberHeading = document.createElement('h2');
	memberHeading.setAttribute('contenteditable', '');
	memberHeading.classList.add('editable');
	memberHeading.classList.add('heading');
	memberHeading.innerHTML = 'Full Name goes here! Click to edit...';

	var memberContent = document.createElement('p');
	memberContent.setAttribute('contenteditable', '');
	memberContent.classList.add('editable');
	memberContent.classList.add('content');
	memberContent.innerHTML = 'Description goes here! Click to edit...';

	var removeButton = document.createElement('span');
	removeButton.classList.add('glyphicon');
	removeButton.classList.add('glyphicon-remove-circle');
	removeButton.classList.add('pull-right');
	removeButton.classList.add('remove-button');

	editableGroup.appendChild(memberHeading);
	editableGroup.appendChild(memberContent);

	memberInfo.appendChild(editableGroup);

	teamMemberData.appendChild(memberPhoto);
	teamMemberData.appendChild(memberInfo);
	teamMemberData.appendChild(removeButton);

	return teamMemberData;
};

var generateSpeakerElement = function () {
	
	var speakerData = document.createElement('div');
	speakerData.classList.add('speaker-data');
	speakerData.id = 's' + Date.now();

	var speakerInfo = document.createElement('div');
	speakerInfo.classList.add('speaker-info');

	var speakerPhoto = document.createElement('div');
	speakerPhoto.classList.add('speaker-photo');

	var inputElement = document.createElement('input');
	inputElement.setAttribute('type', 'file');
	inputElement.setAttribute('name', 'member-photo');
	inputElement.classList.add('hidden');
	inputElement.classList.add('photo-input');

	var photoPreview = document.createElement('img');
	photoPreview.setAttribute('src', '/images/default_photo.png');
	photoPreview.setAttribute('for', '#' + speakerData.id);
	photoPreview.classList.add('preview');
	photoPreview.classList.add('btn-add-photo');

	speakerPhoto.appendChild(inputElement);
	speakerPhoto.appendChild(photoPreview);

	var editableGroup = document.createElement('div');
	editableGroup.classList.add('editable-group');

	var speakerHeading = document.createElement('h2');
	speakerHeading.setAttribute('contenteditable', '');
	speakerHeading.classList.add('editable');
	speakerHeading.classList.add('heading');
	speakerHeading.innerHTML = 'Full Name goes here! Click to edit...';

	var speakerContent = document.createElement('p');
	speakerContent.setAttribute('contenteditable', '');
	speakerContent.classList.add('editable');
	speakerContent.classList.add('content');
	speakerContent.innerHTML = 'Description goes here! Click to edit...';

	editableGroup.appendChild(speakerHeading);
	editableGroup.appendChild(speakerContent);

	speakerInfo.appendChild(editableGroup);

	speakerData.appendChild(speakerPhoto);
	speakerData.appendChild(speakerInfo);

	return speakerData;
};

var generateSessionElement = function () {
	var sessionData = document.createElement('div');
	sessionData.classList.add('session-data');
	sessionData.classList.add('editable-group');

	var sessionInfo = document.createElement('div');
	sessionInfo.classList.add('session-info');
	sessionInfo.classList.add('centre');

	var editableGroup = document.createElement('div');
	editableGroup.classList.add('editable-group');

	var sessionHeading = document.createElement('h2');
	sessionHeading.setAttribute('contenteditable', '');
	sessionHeading.classList.add('editable');
	sessionHeading.classList.add('heading');
	sessionHeading.innerHTML = 'Session date goes here! Click to edit...';

	var sessionList = document.createElement('div');
	sessionList.classList.add('session-list');

	var speaker1 = generateSpeakerElement();
	var speaker2 = generateSpeakerElement();
	var speaker3 = generateSpeakerElement();

	var removeButton = document.createElement('span');
	removeButton.classList.add('glyphicon');
	removeButton.classList.add('glyphicon-remove-circle');
	removeButton.classList.add('pull-right');
	removeButton.classList.add('remove-button');

	editableGroup.appendChild(sessionHeading);

	sessionInfo.appendChild(editableGroup);

	sessionList.appendChild(speaker1);
	sessionList.appendChild(speaker2);
	sessionList.appendChild(speaker3);

	sessionData.appendChild(sessionInfo);
	sessionData.appendChild(sessionList);
	sessionData.appendChild(removeButton);

	return sessionData;
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
	var elements = document.querySelectorAll('#' + context + ' .text-data .editable');
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

var updatePhotoPreview = function (inputElement) {
	if (inputElement.files && inputElement.files[0]) {

		var target = inputElement.parentNode.querySelector('img.preview');
		var fileReader = new FileReader();

		fileReader.onload = function (e) {
			target.setAttribute('src', e.target.result);
		}

		fileReader.readAsDataURL(inputElement.files[0]);
	}
}

$(document).on('DOMSubtreeModified', '.section-edit', function (e) {
	
	enableModifiedNotification(this);

	if (this.getAttribute('section') == 'speakers') return;

	var errorsFound = checkErrors(this.id);
	toggleErrorsNotification(this, errorsFound);
});

$(document).on('click', '.btn-add-heading', function (e) {
	var element = generateEditableGroup('h2');
	var target = this.parentNode.getAttribute('for');

	document.querySelector(target + ' .text-data').appendChild(element);
});

$(document).on('click', '.btn-add-paragraph', function (e) {
	var element = generateEditableGroup('p');
	var target = this.parentNode.getAttribute('for');

	document.querySelector(target + ' .text-data').appendChild(element);
});

$(document).on('click', '.btn-add-team-member', function (e) {
	var element = generateTeamMemberGroup();
	var target = this.parentNode.getAttribute('for');

	document.querySelector(target + ' .list-data').appendChild(element);
});

$(document).on('click', '.btn-add-photo', function (e) {
	var target = this.getAttribute('for');
	var inputElement = document.querySelector(target + ' .photo-input');

	$(inputElement).click();
});

$(document).on('change', '.photo-input', function (e) {
	updatePhotoPreview(this);
});

$(document).on('click', '.remove-button', function (e) {
	this.parentNode.remove();
});

$(document).on('click', '.btn-add-session', function (e) {
	var element = generateSessionElement();
	var target = this.parentNode.getAttribute('for');

	document.querySelector(target + ' .list-data').appendChild(element);
});

$(document).on('click', '.btn-save', function (e) {
	var target = this.parentNode.getAttribute('for');
	var targetElement = document.querySelector(target);

	var data = new Object();
	data.section = targetElement.getAttribute('section');
	data.elements = new Array();
	data.sessions = new Array();
	data.members = new Array();

	var elems = document.querySelectorAll(target + ' .text-data .editable');
	for (var i = 0; i < elems.length; i++) {
		var element = new Object();
		element.type = elems[i].tagName.toLowerCase();
		element.content = elems[i].innerHTML;

		data.elements.push(element);
	};

	var members = document.querySelectorAll(target + ' .list-data .team-member-data');
	for (var i = 0; i < members.length; i++) {
		var mbr = new Object();
		mbr.id = members[i].id;
		mbr.photo = members[i].querySelector('img.preview').getAttribute('src');
		mbr.name = members[i].querySelector('.heading').innerHTML;
		mbr.description = members[i].querySelector('.content').innerHTML;

		data.members.push(mbr);
	};

	var sessions = document.querySelectorAll(target + ' .list-data .session-data');
	for (var i = 0; i < sessions.length; i++) {
		var ssn = new Object();
		ssn.date = sessions[i].querySelector('.session-info h2.heading').innerHTML;
		ssn.speakers = new Array();

		var speakers = sessions[i].querySelectorAll('.session-list .speaker-data');
		for (var j = 0; j < speakers.length; j++) {
			var spkr = new Object();
			spkr.id = speakers[j].id;
			spkr.photo = speakers[j].querySelector('img.preview').getAttribute('src');
			spkr.name = speakers[j].querySelector('.heading').innerHTML;
			spkr.description = speakers[j].querySelector('.content').innerHTML;

			ssn.speakers.push(spkr);
		};

		data.sessions.push(ssn);
	};

	this.classList.add('disabled');
	this.querySelector('.btn-content').innerHTML = 'Saving...';

	pushUpdates(data, function () {
		clearModifiedNotification(targetElement);
	});
});

$(document).on('paste', '.editable', function (e) {

	var pastedText = undefined;

	if (window.clipboardData && window.clipboardData.getData) { // IE
		pastedText = window.clipboardData.getData('Text');
	} else if (e.clipboardData && e.clipboardData.getData) {
		pastedText = e.clipboardData.getData('text/plain');
	} else if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
		pastedText = e.originalEvent.clipboardData.getData('text/plain');
	}

	this.innerHTML = pastedText;

	e.preventDefault();
	return false;
});

$(document).on('DOMSubtreeModified', '#team-section-edit .list-data', function (e) {
	var members = this.querySelectorAll('.team-member-data');
	var notification = this.querySelector('.empty-list-warning');

	if (members.length == 0) {
		$(notification).show();
	} else {
		$(notification).hide();
	}
});

$(document).on('DOMSubtreeModified', '#speakers-section-edit .list-data', function (e) {
	var sessions = this.querySelectorAll('.session-data');
	var notification = this.parentNode.querySelector('.empty-list-warning');

	if (sessions.length == 0) {
		$(notification).show();
		toggleErrorsNotification(this.parentNode, true);
	} else {
		$(notification).hide();
		toggleErrorsNotification(this.parentNode, false);
	}
});