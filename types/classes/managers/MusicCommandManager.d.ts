import { BaseCommandManager } from "@tryforge/forgescript";
import { Events } from "distube";
/**
 * Common music handler name.
 */
export declare const handlerName = "ForgeMusic";
/**
 * The music command manager.
 */
export declare class MusicCommandManager extends BaseCommandManager<`${Events}`> {
    handlerName: string;
}
