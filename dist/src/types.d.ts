import { Observable, Subject, Subscription } from "rxjs";
import { SubscriberConfig } from "./types";
/** @description Options that get mixed into the agent as read-only
 * properties upon construction. Whitelisted to: agentId
 */
export interface AgentConfig {
    /** @description Any value: One Suggestion is hex digits (a4ad3d) but
     * the way you'll create this will depend on your environment.
     */
    agentId?: any;
    /** @description If true, indicates that this Agent is willing to
     * forward actions out, if they have `meta.push` set to true. More
     * appropriate for a server, than a client.
     */
    relayActions?: boolean;
    [key: string]: any;
}
export interface ActionProcessor {
    process(action: Action, context?: Object): ProcessResult;
    addFilter(subscriber: Subscriber, config: SubscriberConfig): Subscription;
    addRenderer(subscriber: Subscriber, config: SubscriberConfig): Subscription;
}
export interface Subscriber {
    (item: ActionStreamItem): any;
}
export interface Action {
    type: string;
    payload?: any;
    error?: boolean;
    meta?: Object;
}
export interface ActionStreamItem {
    action: Action;
    context?: Object;
    results: Map<string, any>;
    renderBeginnings: Map<string, Subject<boolean>>;
    renderEndings: Map<string, Subject<boolean>>;
}
/**
 * @description When a renderer (async usually) returns an Observable, it's possible
 * that multiple renderings will be active at once (see demo 'speak-up'). The options
 * are:
 * - parallel: Concurrent renders are unlimited, unadjusted
 * - serial: Concurrency of 1, render starts are queued
 * - cutoff: Concurrency of 1, any existing render is killed
 * - mute: Concurrency of 1, existing render prevents new renders
 */
export declare enum Concurrency {
    /** @description Concurrent renders are unlimited, unadjusted */
    parallel = "parallel",
    /** @description Concurrency of 1, render starts are queued */
    serial = "serial",
    /** @description Concurrency of 1, any existing render is killed */
    cutoff = "cutoff",
    /** @description Concurrency of 1, existing render prevents new renders */
    mute = "mute"
}
export interface StreamTransformer {
    (stream: Observable<ActionStreamItem>): Observable<ActionStreamItem>;
}
export interface SubscriberConfig {
    name?: string;
    concurrency?: Concurrency;
    xform?: StreamTransformer;
    processResults?: Boolean;
    actionsOfType?: ActionFilter;
}
export declare type ActionFilter = string | RegExp | ((asi: ActionStreamItem) => boolean);
/**
 * @description Your contract for what is returned from calling #process.
 * Basically this is the Object.assign({}, action, results), and so
 * you can destructure from it your renderer's return values by name,
 * or `type`, `payload`, or `meta`. Meta will often be interesting since
 * synchronous renderers (filters) can modify or add new meta, and often do.
 */
export interface ProcessResult {
    [key: string]: any;
}
/**
 * @description Options are typical from rxjs/ajax, however the expandKey string
 * is one corresponding to OboeJS node matcher.
 */
export interface StreamingGetOptions {
    url: string;
    expandKey?: string;
    method?: "GET" | "POST";
    headers?: Object;
    body?: string | Object;
    withCredentials?: Boolean;
    timeout?: number;
}
