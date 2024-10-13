import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { DisTubeEvents } from "distube";
/**
 * The generic music event handler.
 */
export declare class MusicEventHandler<Events extends DisTubeEvents = DisTubeEvents, Names extends keyof Events = keyof Events> extends BaseEventHandler<Events, Names> {
    /**
     * Register this event.
     * @param client - ForgeClient instance.
     */
    register(client: ForgeClient): void;
}
/**
 * Structure for additional information
 * to identify a song.
 */
export interface AdditionalMeta {
}
