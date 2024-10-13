import { ForgeMusic } from "@structures/ForgeMusic"
import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript"
import { DisTubeEvents } from "distube"

/**
 * The generic music event handler.
 */
export class MusicEventHandler<Events extends DisTubeEvents = DisTubeEvents, Names extends keyof Events = keyof Events> extends BaseEventHandler<Events, Names> {
    /**
     * Register this event.
     * @param client - ForgeClient instance.
     */
    public register(client: ForgeClient) {
        client.getExtension(ForgeMusic).distube.on(this.name as keyof DisTubeEvents, this.listener.bind(client))
    }
}

/**
 * Structure for additional information
 * to identify a song.
 */
export interface AdditionalMeta {}