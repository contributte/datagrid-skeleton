datagridFitlerMultiSelect = function () {
	var select = $('.selectpicker').first();

	if ($.fn.selectpicker) {
		return $.fn.selectpicker.defaults = {
			countSelectedText: select.data('i18n-selected'),
			iconBase: '',
			tickIcon: select.data('selected-icon-check')
		};
	}
};

$(function () {
	return datagridFitlerMultiSelect();

	dataGridRegisterExtension('datagrid.fitlerMultiSelect', {
		success: function () {
			datagridFitlerMultiSelect();
			if ($.fn.selectpicker) {
				return $('.selectpicker').selectpicker({
					iconBase: 'fa'
				});
			}
		}
	});
});
