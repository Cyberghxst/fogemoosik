import { EventManager, ForgeClient, ForgeExtension } from "@tryforge/forgescript"
import { handlerName, MusicCommandManager } from "@managers/MusicCommandManager"
import { DisTube, DisTubeOptions, Events } from "distube"

export class ForgeMusic extends ForgeExtension {
    public name = "ForgeMusic"
    public description = "A standard music library tailored for ForgeScript."
    public version = "1.0.0"

    public commands: MusicCommandManager
    public distube: DisTube

    public constructor(private distubeOptions?: DisTubeOptions, private events?: `${Events}`[]) {
        super()
    }

    public init(client: ForgeClient) {
        this.commands = new MusicCommandManager(client)
        this.distube = new DisTube(client, this.distubeOptions)

        this.load(this.nativesLocation)
        
        if (this.events?.length) {
            EventManager.load(handlerName, this.eventsLocation)
            client.events.load(handlerName, this.events)
        }
    }

    /**
     * Returns the events location.
     */
    public get eventsLocation() {
        return __dirname.replace(/classes\\structures/, "events")
    }

    /**
     * Returns the native functions location.
     */
    public get nativesLocation() {
        return __dirname.replace(/classes\\structures/, "natives")
    }
}