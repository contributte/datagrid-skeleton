import type {Naja} from "naja";
import type {
	Ajax,
	RequestParams,
	Payload,
	DatagridPayload,
	EventDetail,
	EventListener,
	Response as AjaxResponse,
	BaseRequestParams as AjaxBaseRequestParams,
	BeforeEventDetail as BaseBeforeEventDetail,
	ErrorEventDetail as BaseErrorEventDetail,
	InteractEventDetail as BaseInteractEventDetail,
	SuccessEventDetail as BaseSuccessEventDetail,
	AjaxEventMap as BaseAjaxEventMap,
} from "@datagrid/types";
import {Datagrid} from "@datagrid/datagrid";
import {BeforeEvent, SuccessEvent, ErrorEvent, Payload as NajaPayload} from "naja/dist/Naja";
import {InteractionEvent} from "naja/dist/core/UIHandler";

export interface BaseRequestParams extends AjaxBaseRequestParams, Request {
	url: string;
	method: string;
}

export interface BeforeEventDetail<D = {}> extends BaseBeforeEventDetail<D> {
	params: EventDetail<BeforeEvent> & RequestParams<D>;
}

export interface InteractEventDetail<
	E extends HTMLElement = HTMLElement
> extends BaseInteractEventDetail<E>, EventDetail<InteractionEvent> {
	element: E;
}

export interface SuccessEventDetail<
	P = DatagridPayload
> extends BaseSuccessEventDetail<P, Response>, EventDetail<SuccessEvent> {
	params: BaseRequestParams;
	payload: Payload<P> & NajaPayload;
	response: AjaxResponse & Response;
}

export interface ErrorEventDetail<
	E extends Error = Error,
> extends BaseErrorEventDetail<E, Response>, EventDetail<ErrorEvent> {
	params: BaseRequestParams;
	response: (AjaxResponse & Response) | undefined;
	error: E;
}

export interface AjaxEventMap extends BaseAjaxEventMap {
	before: CustomEvent<BeforeEventDetail>;
	interact: CustomEvent<InteractEventDetail>;
	snippetUpdate: CustomEvent<InteractEventDetail>;
	success: CustomEvent<SuccessEventDetail>;
	error: CustomEvent<ErrorEventDetail>;
}

export class NajaAjax<C extends Naja = Naja, G extends Datagrid = Datagrid> extends EventTarget implements Ajax<C, G> {
	constructor(public client: C) {
		if (!client.VERSION || client.VERSION < 2) {
			throw new Error("NajaAjax supports Naja 2 and higher" + (client.VERSION ? `(version ${client.VERSION} provided)` : ''))
		}
		super();
	}

	onInit() {
		this.client.addEventListener('before', (e) => {
			return this.dispatch('before', {
				params: e.detail
			});
		})

		this.client.uiHandler.addEventListener('interaction', (e) => {
			if (!(e.detail.element instanceof HTMLElement)) {
				throw new Error("Element is not an instanceof HTMLElement");
			}

			return this.dispatch('interact', {
				...e.detail,
				element: e.detail.element as HTMLElement // Naja's event has a type of HTMLElement
			})
		})


		this.client.addEventListener('success', (e) => {
			return this.dispatch('success', {
				...e.detail,
				params: e.detail.request,
				payload: e.detail.payload as Payload
			});
		})

		this.client.addEventListener('error', (e) => {
			return this.dispatch('error', {
				...e.detail,
				params: e.detail.request,
				response: e.detail.response,
			});
		})

		return this;
	}

	async request<D = {}, P = DatagridPayload>(args: RequestParams<D>): Promise<P> {
		return await this.client.makeRequest(args.method, args.url, args.data) as P;
	}

	async submitForm<E extends HTMLFormElement = HTMLFormElement, P = Payload>(element: E): Promise<P> {
		return await this.client.uiHandler.submitForm(element) as P;
	}

	dispatch<
		K extends string, M extends BaseAjaxEventMap = AjaxEventMap
	>(type: K, detail: K extends keyof M ? EventDetail<M[K]> : any, options?: boolean): boolean {
		return this.dispatchEvent(new CustomEvent(type, {detail}));
	}

	declare addEventListener: <K extends keyof M, M extends BaseAjaxEventMap = AjaxEventMap>(
		type: K,
		listener: EventListener<this, M[K]>,
		options?: boolean | AddEventListenerOptions
	) => void;

	declare removeEventListener: <K extends keyof M, M extends BaseAjaxEventMap = AjaxEventMap>(
		type: K,
		listener: EventListener<this, M[K]>,
		options?: boolean | AddEventListenerOptions
	) => void;

	declare dispatchEvent: <K extends string, M extends BaseAjaxEventMap = AjaxEventMap>(
		event: K extends keyof M ? M[K] : CustomEvent
	) => boolean;
}
