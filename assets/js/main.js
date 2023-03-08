// import 'ublaboo-datagrid/assets/datagrid.js';
// import 'ublaboo-datagrid/assets/datagrid-spinners.js';
// import 'ublaboo-datagrid/assets/datagrid-instant-url-refresh.js';
import naja from "naja";
import netteForms from "nette-forms";
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

	// Highlighting
	const codes = document.querySelectorAll('code');
	codes.forEach(code => {
		Prism.highlightElement(code);
	});
});
