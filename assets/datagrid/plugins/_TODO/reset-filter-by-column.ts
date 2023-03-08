dataGridRegisterExtension('datagrid.reset-filter-by-column', {
	success: function (payload) {
		var grid, href, i, key, len, ref;
		if (!payload._datagrid_name) {
			return;
		}
		grid = $('.datagrid-' + payload._datagrid_name);
		grid.find('[data-datagrid-reset-filter-by-column]').addClass('hidden');
		if (payload.non_empty_filters && payload.non_empty_filters.length) {
			ref = payload.non_empty_filters;
			for (i = 0, len = ref.length; i < len; i++) {
				key = ref[i];
				grid.find('[data-datagrid-reset-filter-by-column=' + key + ']').removeClass('hidden');
			}
			href = grid.find('.reset-filter').attr('href');
			return grid.find('[data-datagrid-reset-filter-by-column]').each(function () {
				var new_href;
				key = $(this).attr('data-datagrid-reset-filter-by-column');
				new_href = href.replace('do=' + payload._datagrid_name + '-resetFilter', 'do=' + payload._datagrid_name + '-resetColumnFilter');
				new_href += '&' + payload._datagrid_name + '-key=' + key;
				return $(this).attr('href', new_href);
			});
		}
	}
});
