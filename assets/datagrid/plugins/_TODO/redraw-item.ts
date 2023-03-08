dataGridRegisterExtension('datagrid.redraw-item', {
	success: function (payload) {
		var row;
		if (payload._datagrid_redraw_item_class) {
			row = $('tr[data-id=' + payload._datagrid_redraw_item_id + ']');
			return row.attr('class', payload._datagrid_redraw_item_class);
		}
	}
});
