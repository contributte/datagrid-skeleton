import { serializeUrl } from "../../utils";

dataGridRegisterExtension('datagrid.url', {
	success: function (payload) {
		var host, path, query, url;
		if (payload._datagrid_url) {
			if (window.history.replaceState) {
				host = window.location.protocol + "//" + window.location.host;
				path = window.location.pathname;
				query = serializeUrl(payload.state, null).replace(/&+$/gm, '');
				if (query) {
					url = host + path + "?" + query.replace(/\&*$/, '');
				} else {
					url = host + path;
				}
				url += window.location.hash;
				if (window.location.href !== url) {
					return window.history.replaceState({
						path: url
					}, '', url);
				}
			}
		}
	}
});
