// pocet polozek na stranku
$(document).on('change', 'select[data-autosubmit-per-page]', function () {
	var button;
	button = $(this).parent().find('input[type=submit]');
	if (button.length === 0) {
		button = $(this).parent().find('button[type=submit]');
	}
	return button.click();
});


$(document).on('change', 'select[data-autosubmit]', function () {
	return dataGridSubmitForm($(this).closest('form').first());
});

// date filter
$(document).on('change', 'input[data-autosubmit][data-autosubmit-change]', function (e) {
	var $this, code;
	code = e.which || e.keyCode || 0;
	clearTimeout(window.datagrid_autosubmit_timer);
	$this = $(this);
	return window.datagrid_autosubmit_timer = setTimeout((function (_this) {
		return function () {
			return dataGridSubmitForm($this.closest('form').first());
		};
	})(this), 200);
});

$(document).on('keyup', 'input[data-autosubmit]', function (e) {
	var $this, code;
	code = e.which || e.keyCode || 0;
	if ((code !== 13) && ((code >= 9 && code <= 40) || (code >= 112 && code <= 123))) {
		return;
	}
	clearTimeout(window.datagrid_autosubmit_timer);
	$this = $(this);
	return window.datagrid_autosubmit_timer = setTimeout((function (_this) {
		return function () {
			return dataGridSubmitForm($this.closest('form').first());
		};
	})(this), 200);
});

$(document).on('keydown', 'input[data-datagrid-manualsubmit]', function (e) {
	var code;
	code = e.which || e.keyCode || 0;
	if (code === 13) {
		e.stopPropagation();
		e.preventDefault();
		return dataGridSubmitForm($(this).closest('form').first());
	}
});
