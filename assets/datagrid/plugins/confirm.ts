import { DatagridPlugin, InitContext } from "../@types/types";

export class ConfirmPlugin implements DatagridPlugin {
	name = 'confirm'

	init({ root, naja }: InitContext): void {
		naja.registerExtension({
			initialize(naja) {
				naja.uiHandler.addEventListener("interaction", (event) => {
					const confirmMessage = (event.detail.element as HTMLElement).dataset["datagridConfirm"];
					if (confirmMessage) {
						if (!confirm(confirmMessage)) {
							event.preventDefault();
						}
					}
				});
			}
		})
	}
}
