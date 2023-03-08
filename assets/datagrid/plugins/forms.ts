import { DatagridPlugin, InitContext } from "../@types/types";

export class FormsPlugin implements DatagridPlugin {
	name = 'forms'

	init({ root, naja }: InitContext): void {
		naja.registerExtension({
			initialize(naja) {
				naja.addEventListener('success', () => {
					const forms = root.querySelectorAll('form');
					forms.forEach((form: HTMLFormElement) => window.netteForms.initForm(form));
				});
			}
		})
	}
}
