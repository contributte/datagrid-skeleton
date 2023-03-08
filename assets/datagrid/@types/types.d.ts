import { Naja } from "naja";

export type DatagridElement = HTMLDivElement;

export interface DatagridOptions {
	root: DatagridElement,
	debug: boolean
}

interface InitContext {
	root: DatagridElement;
	naja: Naja;
}

export interface DatagridPlugin {
	name: string;

	init(ctx: InitContext): void;
}
