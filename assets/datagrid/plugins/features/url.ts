import { DatagridPlugin } from "@datagrid/types";
import {qs} from "@datagrid/utils";
import {Datagrid} from "@datagrid";

export class UrlPlugin implements DatagridPlugin {
	onDatagridInit(datagrid: Datagrid): boolean {
		datagrid.ajax.addEventListener('success', ({detail: {payload}}) => {
			if (payload._datagrid_url) {
				if (!window.history.pushState) {
					throw new Error("History.replaceState() is not available in this browser!")
				}

				const url = new URL(window.location.href);
				window.location.search = qs(payload.state);

				window.history.pushState({path: url.toString()}, "", url.toString());
			}
		})

		return true;
	}
}
