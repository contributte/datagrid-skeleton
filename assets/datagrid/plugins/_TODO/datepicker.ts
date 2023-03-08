import { Datepicker } from "vanillajs-datepicker";
import "vanillajs-datepicker/sass/datepicker.scss";
import naja from "naja";

export function init(): void {
	naja.registerExtension(new DataGridDatepickerExtension());
}

class DataGridDatepickerExtension {
	initialize(naja) {
		const elem = document.querySelector('input[data-exec="datepicker"]')
		if (elem != null) {
			const datepicker = new Datepicker(elem, {})
		}
	}
}
