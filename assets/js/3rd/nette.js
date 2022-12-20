import naja from "naja";
import netteForms from "nette-forms";

export function initNette() {
	naja.formsHandler.netteForms = netteForms;
	naja.initialize();
}
