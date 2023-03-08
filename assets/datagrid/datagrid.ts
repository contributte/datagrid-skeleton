import naja from "naja";
import { DatagridOptions, DatagridPlugin } from "./@types/types";

export function createDatagrid(options: DatagridOptions): Datagrid {
	if (!('netteForms' in window)) {
		throw 'Missing nette-forms dependency.';
	}

	return new Datagrid(options);
}

class Datagrid {
	private readonly options: DatagridOptions;
	private readonly plugins: DatagridPlugin[] = [];

	constructor(options: DatagridOptions) {
		if (!(options.root instanceof HTMLElement)) {
			this.error('Invalid root element given', { element: options.root });
		}

		this.options = Object.assign({
			debug: false,
		}, options);

		this.log(`Create datagrid`, { options: this.options });
	}

	use(plugin: DatagridPlugin): void {
		this.log(`Register plugin ${plugin.name}`, { plugin });

		this.plugins.push(plugin);
	}

	init(): void {
		for (const pluginKey in this.plugins) {
			const plugin = this.plugins[pluginKey];
			const ctx = {
				root: this.options.root,
				naja
			};

			this.log(`Initialize plugin ${plugin.name}`, { plugin, ctx });

			plugin.init(ctx);
		}
	}

	log(message: string, ctx: any): void {
		if (this.options.debug) {
			console.log(message, ctx);
		}
	}

	error(message: string, ctx: any): void {
		console.error(message, ctx);
	}
}

function makeRequest(params) {
	var method = params.type || 'GET';
	var data = params.data || null;

	naja.makeRequest(method, params.url, data, {})
		.then(params.success)
		.catch(params.error);
}

function submitForm(form) {
	return naja.uiHandler.submitForm(form.get(0));
}
