import { DatagridPlugin } from "@datagrid/types";
import { window } from "@datagrid/utils";
import type {Happy} from "@datagrid/integrations";
import {Datagrid} from "~/assets/datagrid";

export class HappyPlugin implements DatagridPlugin {
	constructor(private happy?: Happy) {
	}

	onDatagridInit(datagrid: Datagrid): boolean  {
		const happy = this.happy ?? window().happy ?? null;

		if (happy) {
			happy.init();
		}

		return true;
	}
}
