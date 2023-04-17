import {Datagrid} from "@datagrid";
import {DatagridPlugin} from "@datagrid/types";
import {attachSlideToggle} from "@datagrid/utils";

export class ItemDetailPlugin implements DatagridPlugin {
	onDatagridInit(datagrid: Datagrid): boolean {
		datagrid.el.querySelectorAll<HTMLElement>("[data-toggle-detail-grid]")
			.forEach((el) => {
				if (el.getAttribute("data-toggle-detail-grid") !== datagrid.name) return;
				const toggleId = el.getAttribute("data-toggle-detail")!;

				el.addEventListener("click", (e) => {
					const contentRow = datagrid.el.querySelector<HTMLElement>(
						`.item-detail-${datagrid.name}-id-${toggleId}`
					);
					if (contentRow) {
						attachSlideToggle(contentRow, el);
					}
				})
			});

		return true;
	}
}
