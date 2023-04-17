import {Datagrid} from "@datagrid";
import {DatagridPlugin} from "@datagrid/types";
import {attachSlideToggle} from "@datagrid/utils";

export class ItemDetailPlugin implements DatagridPlugin {
	onDatagridInit(datagrid: Datagrid): boolean {
		datagrid.el.querySelectorAll("[data-toggle-detail]")
			.forEach((el) => {
				const toggleName = el.getAttribute("data-toggle-detail")!;
				const fullName = el.getAttribute("data-toggle-detail-grid-fullname");
				const row = datagrid.el.querySelector<HTMLElement>(
			`.item-detail-${fullName}-id-${toggleName}`
				);

				if (row && row.querySelector<HTMLElement>(".item-detail-content")) {
					attachSlideToggle(row);
				}
			});

		return true;
	}
}
