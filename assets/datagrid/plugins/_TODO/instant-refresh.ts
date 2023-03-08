export function init() {
	dataGridRegisterAjaxCall = function (params) {
		var method = params.type || 'GET';
		var data = params.data || null;

		naja.makeRequest(method, params.url, data, {
			history: 'replace'
		})
			.then(params.success)
			.catch(params.error);
	};

	const element = document.querySelector('.datagrid');

	if (element !== null) {
		return dataGridRegisterAjaxCall({
			type: 'GET',
			url: element.getAttribute('data-refresh-state')
		});
	}
}
