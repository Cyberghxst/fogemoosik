import { BaseCommandManager } from "@tryforge/forgescript"
import { Events } from "distube"

/**
 * Common music handler name.
 */
export const handlerName = "ForgeMusic"

/**
 * The music command manager.
 */
export class MusicCommandManager extends BaseCommandManager<`${Events}`> {
    handlerName = handlerName
}