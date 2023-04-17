import {DatagridPlugin, Nette} from "@datagrid/types";
import {Datagrid} from "@datagrid";
import {window} from "@datagrid/utils";

export class NetteFormsPlugin implements DatagridPlugin {
	constructor(private nette?: Nette) {
	}

	onDatagridInit(datagrid: Datagrid): boolean {
		const nette = this.nette ?? window().Nette ?? null;

		if (nette) {
			datagrid.el.querySelectorAll<HTMLFormElement>("form").forEach(form => nette.initForm(form));
		}

		return true;
	}
}
