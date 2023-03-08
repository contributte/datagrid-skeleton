datagridGroupActionMultiSelect = function () {
	var selects;

	if (!$.fn.selectpicker) {
		return;
	}

	selects = $('[data-datagrid-multiselect-id]');

	return selects.each(function () {
		var id;
		if ($(this).hasClass('selectpicker')) {
			$(this).removeAttr('id');
			id = $(this).data('datagrid-multiselect-id');
			$(this).on('loaded.bs.select', function (e) {
				$(this).parent().attr('style', 'display:none;');
				return $(this).parent().find('.hidden').removeClass('hidden').addClass('btn-default btn-secondary');
			});
			return $(this).on('rendered.bs.select', function (e) {
				return $(this).parent().attr('id', id);
			});
		}
	});
};

$(function () {
	return datagridGroupActionMultiSelect();

	dataGridRegisterExtension('datagrid.groupActionMultiSelect', {
		success: function () {
			return datagridGroupActionMultiSelect();
		}
	});
});
