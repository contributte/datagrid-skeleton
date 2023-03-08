$(document).on('click', '[data-datagrid-editable-url]', function (event) {
	var attr_name, attr_value, attrs, cell, cellValue, cell_height, cell_lines, cell_padding, input, line_height,
		submit, valueToEdit;
	cell = $(this);
	if (event.target.tagName.toLowerCase() === 'a') {
		return;
	}
	if (cell.hasClass('datagrid-inline-edit')) {
		return;
	}
	if (!cell.hasClass('editing')) {
		cell.addClass('editing');
		cellValue = cell.html().trim().replace('<br>', '\n');
		if (cell.attr('data-datagrid-editable-value')) {
			valueToEdit = cell.data('datagrid-editable-value');
		} else {
			valueToEdit = cellValue;
		}
		cell.data('originalValue', cellValue);
		cell.data('valueToEdit', valueToEdit);
		if (cell.data('datagrid-editable-type') === 'textarea') {
			input = $('<textarea>' + valueToEdit + '</textarea>');
			cell_padding = parseInt(cell.css('padding').replace(/[^-\d\.]/g, ''), 10);
			cell_height = cell.outerHeight();
			line_height = Math.round(parseFloat(cell.css('line-height')));
			cell_lines = (cell_height - (2 * cell_padding)) / line_height;
			input.attr('rows', Math.round(cell_lines));
		} else if (cell.data('datagrid-editable-type') === 'select') {
			input = $(cell.data('datagrid-editable-element'));
			input.find("option[value='" + valueToEdit + "']").prop('selected', true);
		} else {
			input = $('<input type="' + cell.data('datagrid-editable-type') + '">');
			input.val(valueToEdit);
		}
		attrs = cell.data('datagrid-editable-attrs');
		for (attr_name in attrs) {
			attr_value = attrs[attr_name];
			input.attr(attr_name, attr_value);
		}
		cell.removeClass('edited');
		cell.html(input);
		submit = function (cell, el) {
			var value;
			value = el.val();
			if (value !== cell.data('valueToEdit')) {
				dataGridRegisterAjaxCall({
					url: cell.data('datagrid-editable-url'),
					data: {
						value: value
					},
					type: 'POST',
					success: function (payload) {
						if (cell.data('datagrid-editable-type') === 'select') {
							cell.html(input.find("option[value='" + value + "']").html());
						} else {
							if (payload._datagrid_editable_new_value) {
								value = payload._datagrid_editable_new_value;
							}
							cell.html(value);
						}
						return cell.addClass('edited');
					},
					error: function () {
						cell.html(cell.data('originalValue'));
						return cell.addClass('edited-error');
					}
				});
			} else {
				cell.html(cell.data('originalValue'));
			}
			return setTimeout(function () {
				return cell.removeClass('editing');
			}, 1200);
		};
		cell.find('input,textarea,select').focus().on('blur', function () {
			return submit(cell, $(this));
		}).on('keydown', function (e) {
			if (cell.data('datagrid-editable-type') !== 'textarea') {
				if (e.which === 13) {
					e.stopPropagation();
					e.preventDefault();
					return submit(cell, $(this));
				}
			}
			if (e.which === 27) {
				e.stopPropagation();
				e.preventDefault();
				cell.removeClass('editing');
				return cell.html(cell.data('originalValue'));
			}
		});
		return cell.find('select').on('change', function () {
			return submit(cell, $(this));
		});
	}
});

$(document).on('keydown', '.datagrid-inline-edit input', function (e) {
	var code;
	code = e.which || e.keyCode || 0;
	if (code === 13) {
		e.stopPropagation();
		e.preventDefault();
		return $(this).closest('tr').find('.col-action-inline-edit [name="inline_edit[submit]"]').click();
	}
});

dataGridRegisterExtension('datagrid.after_inline_edit', {
	success: function (payload) {
		var grid = $('.datagrid-' + payload._datagrid_name);

		if (payload._datagrid_inline_edited) {
			grid.find('tr[data-id=' + payload._datagrid_inline_edited + '] > td').addClass('edited');
			return grid.find('.datagrid-inline-edit-trigger').removeClass('hidden');
		} else if (payload._datagrid_inline_edit_cancel) {
			return grid.find('.datagrid-inline-edit-trigger').removeClass('hidden');
		}
	}
});

$(document).on('mouseup', '[data-datagrid-cancel-inline-add]', function (e) {
	var code = e.which || e.keyCode || 0;
	if (code === 1) {
		e.stopPropagation();
		e.preventDefault();
		return $('.datagrid-row-inline-add').addClass('datagrid-row-inline-add-hidden');
	}
});

dataGridRegisterExtension('datagrid-toggle-inline-add', {
	success: function (payload) {
		var grid = $('.datagrid-' + payload._datagrid_name);

		if (payload._datagrid_inline_adding) {
			var row = grid.find('.datagrid-row-inline-add');

			if (row.hasClass('datagrid-row-inline-add-hidden')) {
				row.removeClass('datagrid-row-inline-add-hidden');
			}

			row.find('input:not([readonly]),textarea:not([readonly])').first().focus();
		}
	}
});
dataGridRegisterExtension('datagrid.inline-editing', {
	success: function (payload) {
		var grid;
		if (payload._datagrid_inline_editing) {
			grid = $('.datagrid-' + payload._datagrid_name);
			return grid.find('.datagrid-inline-edit-trigger').addClass('hidden');
		}
	}
});
