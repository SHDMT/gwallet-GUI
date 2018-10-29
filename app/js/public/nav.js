const settings = require('electron-settings')

let navInit = () => {
	$('.js-nav').on('click', '.nav-button', function() {
		let curNav = $(this).attr('data-section');
		let curPage = $(this).attr('data-section');
		if(curNav.indexOf('contract') != -1){
			curNav = 'contract';
		}
		handleSectionTrigger(curNav, curPage);
	})

	let handleSectionTrigger = (elm, page) => {
		$('.nav-button').removeClass('is-selected');
		$('.js-section').removeClass('is-shown')
		let buttonId = $('#button-' + elm);
		let sesstionId = $('#' + page + '-section');
		buttonId.addClass('is-selected');
		sesstionId.addClass('is-shown');
		settings.set('activeSectionButtonId', buttonId);
		settings.set('activeSectionId', sesstionId);
	}
	//默认选中第一个tab
	let activateDefaultSection = () => {
		$('#button-assets').addClass('is-selected');
		$('#assets-section').addClass('is-shown');
	}

	let showMainContent = () => {
		$('.js-nav').addClass('is-shown');
		$('.js-content').addClass('is-shown');
	}
	let buttonId = settings.get('activeSectionButtonId');
	let sesstionId = settings.get('activeSectionId');
	if(buttonId && sesstionId) {
		showMainContent()
		$(buttonId.selector).addClass('is-selected');
		$(sesstionId.selector).addClass('is-shown');
	} else {
		activateDefaultSection()
		showMainContent()
	}
}
navInit();