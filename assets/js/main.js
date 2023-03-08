import naja from "naja";
import netteForms from "nette-forms";
import * as datagrid from "../datagrid";
// Code highlighting
import Prism from "prismjs/components/prism-core";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
// Styles
import '../css/main.css';

document.addEventListener("DOMContentLoaded", () => {
	// AJAX
	naja.formsHandler.netteForms = netteForms;
	naja.initialize();

	// Datagrid
	(() => {
		// Search for all datagrids on page
		const elements = document.querySelectorAll('div.datagrid');

		// Initialize datagrid
		for (const element of elements) {
			const grid = datagrid.createDatagrid({ root: element, debug: true });

			// Plugins
			grid.use(new datagrid.FormsPlugin());
			grid.use(new datagrid.ConfirmPlugin());

			grid.init();
		}
	})();

	// Highlighting
	const codes = document.querySelectorAll('code');
	codes.forEach(code => {
		Prism.highlightElement(code);
	});
});
