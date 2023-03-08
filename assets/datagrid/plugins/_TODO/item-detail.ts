dataGridRegisterExtension('datargid.item_detail', {
	start: function (xhr, settings) {
		var id, row_detail, grid_fullname;
		if (settings.nette && settings.nette.el.attr('data-toggle-detail')) {
			id = settings.nette.el.attr('data-toggle-detail');
			grid_fullname = settings.nette.el.attr('data-toggle-detail-grid-fullname');
			row_detail = $('.item-detail-' + grid_fullname + '-id-' + id);
			if (row_detail.hasClass('loaded')) {
				if (!row_detail.find('.item-detail-content').length) {
					row_detail.removeClass('toggled');
					return true;
				}
				if (row_detail.hasClass('toggled')) {
					row_detail.find('.item-detail-content').slideToggle('fast', (function (_this) {
						return function () {
							return row_detail.toggleClass('toggled');
						};
					})(this));
				} else {
					row_detail.toggleClass('toggled');
					row_detail.find('.item-detail-content').slideToggle('fast');
				}
				return false;
			} else {
				row_detail.addClass('loaded');
			}
		}
		return true;
	},
	success: function (payload) {
		var id, row_detail, grid_fullname;
		if (payload._datagrid_toggle_detail && payload._datagrid_name) {
			id = payload._datagrid_toggle_detail;
			grid_fullname = payload._datagrid_name;
			row_detail = $('.item-detail-' + grid_fullname + '-id-' + id);
			row_detail.toggleClass('toggled');
			return row_detail.find('.item-detail-content').slideToggle('fast');
		}
	}
});
