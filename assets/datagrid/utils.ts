import naja from "naja";

export function serializeUrl(obj: object, prefix: string|null) {
	var str = [];
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
			if (v !== null && v !== "") {
				if (typeof v == "object") {
					var r = serializeUrl(v, k);
					if (r) {
						str.push(r);
					}
				} else {
					str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
				}
			}
		}
	}
	return str.join("&");
}

export function indexOf() {
	return [].indexOf || (function (item) {
		for (var i = 0, l = this.length; i < l; i++) {
			if (i in this && this[i] === item) return i;
		}
		return -1;
	})
}

export function getEventDomPath(e) {
	var node, path;
	if (indexOf.call(e, path) >= 0) {
		return e.path;
	}
	path = [];
	node = e.target;
	while (node !== document.body) {
		if (node === null) {
			break;
		}
		path.push(node);
		node = node.parentNode;
	}
	return path;
}

export function dataGridRegisterExtension(name, extension) {
	var init = extension.init;
	var success = extension.success;
	var before = extension.before;
	var complete = extension.complete;
	var interaction = extension.interaction;


	var NewExtension = function NewExtension(naja, name) {
		this.name = name;

		this.initialize = function (naja) {
			if (init) {
				naja.addEventListener('init', function (params) {
					init(params.detail.defaultOptions);
				});
			}

			if (success) {
				naja.addEventListener('success', function (params) {
					success(params.detail.payload, params.detail.options);
				});
			}

			naja.uiHandler.addEventListener('interaction', function (params) {
				params.detail.options.nette = {
					el: $(params.detail.element)
				}
				if (interaction) {
					if (!interaction(params.detail.options)) {
						params.preventDefault();
					}
				}
			});

			if (before) {
				naja.addEventListener('before', function (params) {
					if (!before(params.detail.request, params.detail.options)) {
						params.preventDefault();
					}
				});
			}

			if (complete) {
				naja.addEventListener('complete', function (params) {
					complete(params.detail.request, params.detail.options);
				});
			}
		}
		return this;
	}

	naja.registerExtension(new NewExtension(null, name));
};
