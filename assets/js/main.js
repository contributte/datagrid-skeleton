import naja from "naja";
import netteForms from "nette-forms";
import {
	AutosubmitPlugin,
	BootstrapSelect,
	CheckboxPlugin,
	ConfirmPlugin,
	createDatagrids,
	Happy,
	HappyPlugin,
	InlinePlugin,
	NetteFormsPlugin,
	SelectpickerPlugin,
	DatepickerPlugin,
	SortableJS,
	SortablePlugin, TomSelect,
	UrlPlugin,
	VanillaDatepicker, ItemDetailPlugin
} from "@datagrid";
import {NajaAjax} from "@datagrid/ajax";
import Select from "tom-select";
import {Dropdown} from "bootstrap";
// Code highlighting
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
// Styles

import '../css/main.css';
import { TreeViewPlugin } from "../datagrid/plugins/features/treeView";

document.addEventListener("DOMContentLoaded", () => {
	// AJAX
	naja.formsHandler.netteForms = netteForms;

	Array.from(document.querySelectorAll('.dropdown'))
		.forEach(el => new Dropdown(el))

	createDatagrids(new NajaAjax(naja), {
		datagrid: {
			plugins: [
				new AutosubmitPlugin(),
				new CheckboxPlugin(),
				new ConfirmPlugin(),
				new InlinePlugin(),
				new ItemDetailPlugin(),
			//	new UrlPlugin(),
				new NetteFormsPlugin(netteForms),
				new HappyPlugin(new Happy()),
				new SortablePlugin(new SortableJS()),
				new DatepickerPlugin(new VanillaDatepicker({buttonClass: 'btn'})),
				new SelectpickerPlugin(new TomSelect(Select)),
				new TreeViewPlugin(),
			],
		},
	});

	naja.initialize();

	// Highlighting
	const codes = document.querySelectorAll('code');
	codes.forEach(code => {
		Prism.highlightElement(code);
	});
});
