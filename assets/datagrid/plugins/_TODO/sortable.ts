dataGridRegisterExtension('datagrid.sortable', {
	success: function () {
		return datagridSortable();
	}
});


dataGridRegisterExtension('datagrid.sortable', {
	success: function () {
		return datagridSortable();
	}
});


datagridSortable = function () {
	if (typeof $.fn.sortable === 'undefined') {
		return;
	}
	return $('.datagrid [data-sortable]').sortable({
		handle: '.handle-sort',
		items: 'tr',
		axis: 'y',
		update: function (event, ui) {
			var component_prefix, data, item_id, next_id, prev_id, row, url;
			row = ui.item.closest('tr[data-id]');
			item_id = row.data('id');
			prev_id = null;
			next_id = null;
			if (row.prev().length) {
				prev_id = row.prev().data('id');
			}
			if (row.next().length) {
				next_id = row.next().data('id');
			}
			url = $(this).data('sortable-url');
			data = {};
			component_prefix = row.closest('.datagrid').find('tbody').attr('data-sortable-parent-path');
			data[(component_prefix + '-item_id').replace(/^-/, '')] = item_id;
			if (prev_id !== null) {
				data[(component_prefix + '-prev_id').replace(/^-/, '')] = prev_id;
			}
			if (next_id !== null) {
				data[(component_prefix + '-next_id').replace(/^-/, '')] = next_id;
			}
			return dataGridRegisterAjaxCall({
				type: 'GET',
				url: url,
				data: data,
				error: function (jqXHR, textStatus, errorThrown) {
					return alert(jqXHR.statusText);
				}
			});
		},
		helper: function (e, ui) {
			ui.children().each(function () {
				return $(this).width($(this).width());
			});
			return ui;
		}
	});
};

$(function () {
	return datagridSortable();
});
