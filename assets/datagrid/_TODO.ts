dataGridRegisterExtension('datagrid.sort', {
	success: function (payload) {
		var href, key, ref, results;
		if (payload._datagrid_sort) {
			ref = payload._datagrid_sort;
			results = [];
			for (key in ref) {
				href = ref[key];
				results.push($('#datagrid-sort-' + key).attr('href', href));
			}
			return results;
		}
	}
});
