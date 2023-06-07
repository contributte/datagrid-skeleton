import naja from "naja";
import netteForms from "nette-forms";
import {
	AutosubmitPlugin,
	CheckboxPlugin,
	ConfirmPlugin,
	createDatagrids,
	DatepickerPlugin,
	Happy,
	HappyPlugin,
	InlinePlugin,
	ItemDetailPlugin,
	NetteFormsPlugin,
	SelectpickerPlugin,
	SortableJS,
	SortablePlugin,
	TomSelect,
	TreeViewPlugin,
	VanillaDatepicker
} from "@contributte/datagrid/assets";
import { NajaAjax } from "@contributte/datagrid/assets/ajax";
import Select from "tom-select";
import { Dropdown } from "bootstrap";

// Code highlighting
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";

// Styles
import '../css/main.css';

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
				new NetteFormsPlugin(netteForms),
				new HappyPlugin(new Happy()),
				new SortablePlugin(new SortableJS()),
				new DatepickerPlugin(new VanillaDatepicker({buttonClass: 'btn'})),
				new SelectpickerPlugin(new TomSelect(Select)),
				new TreeViewPlugin(),
			],
		},
	});
});

document.addEventListener("DOMContentLoaded", () => {
	// Highlighting
	const codes = document.querySelectorAll('code');
	codes.forEach(code => {
		Prism.highlightElement(code);
	});
});
