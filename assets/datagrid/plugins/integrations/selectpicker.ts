import {DatagridPlugin, Selectpicker} from "@datagrid/types";
import {Datagrid} from "@datagrid";

export class SelectpickerPlugin implements DatagridPlugin {
	constructor(private selectpicker: Selectpicker) {
	}

	onDatagridInit(datagrid: Datagrid): boolean {
		const elements = datagrid.el.querySelectorAll<HTMLElement>(".selectpicker");

		if (elements.length >= 1) {
			this.selectpicker.initSelectpickers(Array.from(elements), datagrid);
		}

		return true;
	}
}
