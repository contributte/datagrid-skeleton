import {Datagrid} from "@datagrid";

// TODO
export interface Sortable {
	initSortable(datagrid: Datagrid): void;
	initSortableTree(datagrid: Datagrid): void;
}

// TODO
export interface Selectpicker {
	initSelectpickers(elements: HTMLElement[], datagrid: Datagrid): void;
}

export interface Datepicker {
	initDatepickers(elements: HTMLInputElement[], datagrid: Datagrid): void;
}
