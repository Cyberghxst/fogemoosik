import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { MusicCommandManager } from "../managers/MusicCommandManager";
import { DisTube, DisTubeOptions, Events } from "distube";
export declare class ForgeMusic extends ForgeExtension {
    private distubeOptions?;
    private events?;
    name: string;
    description: string;
    version: string;
    commands: MusicCommandManager;
    distube: DisTube;
    constructor(distubeOptions?: DisTubeOptions, events?: `${Events}`[]);
    init(client: ForgeClient): void;
    /**
     * Returns the events location.
     */
    get eventsLocation(): string;
    /**
     * Returns the native functions location.
     */
    get nativesLocation(): string;
}
