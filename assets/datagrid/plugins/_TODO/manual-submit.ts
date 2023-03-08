$(document).on('keydown', 'input[data-datagrid-manualsubmit]', function (e) {
	var code;
	code = e.which || e.keyCode || 0;
	if (code === 13) {
		e.stopPropagation();
		e.preventDefault();
		return dataGridSubmitForm($(this).closest('form').first());
	}
});
