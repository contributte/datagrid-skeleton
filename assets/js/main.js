import naja from "naja";
import netteForms from "nette-forms";
import {
	AutosubmitPlugin,
	CheckboxPlugin,
	ConfirmPlugin,
	createDatagrids,
	DatepickerPlugin,
	InlinePlugin,
	EditablePlugin,
	ItemDetailPlugin,
	NetteFormsPlugin,
	SelectpickerPlugin,
	SortableJS,
	SortablePlugin,
	TomSelect,
	TreeViewPlugin,
	VanillaDatepicker
} from "../../vendor/ublaboo/datagrid/assets"
import { NajaAjax } from "../../vendor/ublaboo/datagrid/assets/ajax";
import Select from "tom-select";
import { Dropdown } from "bootstrap";
import Datepicker from 'vanillajs-datepicker/Datepicker';
import cs from 'vanillajs-datepicker/locales/cs';

// Styles
import '../css/main.css';

// Datepicker Locale
Object.assign(Datepicker.locales, cs);

// Datagrid + UI
document.addEventListener("DOMContentLoaded", () => {
	// Initialize dropdowns
	Array.from(document.querySelectorAll('.dropdown'))
		.forEach(el => new Dropdown(el))

	// Initialize Naja (nette ajax)
	naja.formsHandler.netteForms = netteForms;
	naja.initialize();

	// Initialize datagrids
	createDatagrids(new NajaAjax(naja), {
		datagrid: {
			plugins: [
				new AutosubmitPlugin(),
				new CheckboxPlugin(),
				new ConfirmPlugin(),
				new InlinePlugin(),
				new ItemDetailPlugin(),
				new EditablePlugin(),
				new NetteFormsPlugin(netteForms),
				new SortablePlugin(new SortableJS()),
				new DatepickerPlugin(new VanillaDatepicker({ buttonClass: 'btn', language: 'cs' })),
				new SelectpickerPlugin(new TomSelect(Select)),
				new TreeViewPlugin(),
			],
		},
	});
});
