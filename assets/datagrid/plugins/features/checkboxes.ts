import { DatagridPlugin } from "@datagrid/types";
import {Datagrid} from "@datagrid";

export const CheckboxAttribute = "data-check";

export class CheckboxPlugin implements DatagridPlugin {
	onDatagridInit(datagrid: Datagrid): boolean {
		let lastCheckbox = null;

		datagrid.el.addEventListener("click", e => {
			if (!(e.target instanceof HTMLElement)) return;

			if (e.target.classList.contains("col-checkbox")) {
				lastCheckbox = e.target;
				if (e.shiftKey && lastCheckbox) {
					const currentCheckboxRow = lastCheckbox.closest("tr");
					if (!currentCheckboxRow) return;

					const lastCheckboxRow = lastCheckbox.closest("tr");
					if (!lastCheckboxRow) return;

					const lastCheckboxTbody = lastCheckboxRow.closest("tbody");
					if (!lastCheckboxTbody) return;

					const checkboxesRows = Array.from(lastCheckboxTbody.querySelectorAll<HTMLElement>("tr"));
					const [start, end] = [lastCheckboxRow.rowIndex, currentCheckboxRow.rowIndex].sort();
					const rows = checkboxesRows.slice(start, end + 1);

					rows.forEach(row => {
						const input = row.querySelector<HTMLInputElement>('.col-checkbox input[type="checkbox"]');
						if (input) {
							input.checked = true;
						}
					});
				}
			}
		});

		const checkboxes = datagrid.el.querySelectorAll<HTMLInputElement>(`input[data-check-all-${datagrid.name}]`);
		const select = datagrid.el.querySelector<HTMLSelectElement>("select[name='group_action[group_action]']");
		const actionButtons = document.querySelectorAll<HTMLInputElement | HTMLButtonElement>(
			".row-group-actions *[type='submit']"
		);
		const counter = document.querySelector<HTMLElement>(".datagrid-selected-rows-count");

		// Handling a checkbox click + select all checkbox
		datagrid.el.querySelectorAll<HTMLElement>(`[${CheckboxAttribute}]`).forEach(checkEl => {
			checkEl.addEventListener("change", () => {
				const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked);
				const hasChecked = checked.length >= 1;

				actionButtons.forEach(button => (button.disabled = !hasChecked));

				if (select) {
					select.disabled = !hasChecked;
				}

				if (counter) {
					counter.innerText = `${checked.length}/${checkboxes.length}`;
				}

				// Select all
				const isSelectAll = checkEl.hasAttribute("data-check-all");
				if (isSelectAll) {
					checkboxes.forEach(checkbox => (checkbox.checked = true));
				}
			});
		});

		return true;
	}
}
