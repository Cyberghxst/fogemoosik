import { EventManager, ForgeClient, ForgeExtension, Logger } from "@tryforge/forgescript"
import { GuildQueueEvent, Player, type PlayerInitOptions } from "discord-player"
import { MusicCommandManager, handlerName } from "@managers/MusicCommandManager"
import { GatewayIntentsString } from "discord.js"

/**
 * Unexported type from `discord-player`.
 */
declare const knownExtractorKeys: readonly ["SpotifyExtractor", "AppleMusicExtractor", "SoundCloudExtractor", "YouTubeExtractor", "VimeoExtractor", "ReverbnationExtractor", "AttachmentExtractor"];

/**
 * Constructor options of the music extension.
 */
interface ForgeMusicInitOptions extends PlayerInitOptions {
    /**
     * Array of event names the extension must listen to.
     */
    events?: GuildQueueEvent[]
    /**
     * Predicate to load certain extractors.
     * @returns {boolean | null}
     */
    extractorsLoadFilter?: (ext: (typeof knownExtractorKeys)[number]) => boolean | null
}

/**
 * The entrypoint of the forge music system.
 */
export class ForgeMusic extends ForgeExtension {
    /** Cock my beloved. <3 */
    public name = "ForgeMusic"
    public description = "A standard music library tailored for ForgeScript."
    public version = "1.0.0"

    /**
     * The entrypoint of the player application.
     */
    public player: Player
    /**
     * The music command manager.
     */
    public commands: MusicCommandManager
    /**
     * The required intents for this extension to work.
     */
    private requiredIntents: GatewayIntentsString[] = ["GuildVoiceStates"]
    public lyrics

    /**
     * Creates an instance of the music extension.
     * @returns {ForgeMusic}
     */
    public constructor(private options?: ForgeMusicInitOptions) {
        super()
        if (this.#hasInvalidEvents()) {
            Logger.error("ForgeMusic found that you are using some of the following events:\n- VoiceStateUpdate\n- WillAutoPlay\n- WillPlayTrack\nthat aren't supported.")
        }
    }

    /**
     * Starts the music extension.
     * @param client - The discord client instance.
     * @returns {void}
     */
    public init(client: ForgeClient) {
        // Checking if client has the required intents.
        if (!client.options.intents.has(this.requiredIntents[0])) {
            Logger.warn(`${this.name} requires the following intents to work: \"${this.requiredIntents[0]}\"`)
        }

        // Create a main player instance.
        this.player = new Player(client, this.options)
        // Create the command manager.
        this.commands = new MusicCommandManager(client)

        // Load the native functions.
        this.load(this.nativesLocation)

        // Load the events if available.
        if (this.options?.events?.length) {
            EventManager.load(handlerName, this.eventsLocation)
            client.events.load(handlerName, this.options.events)
        }

        // Loading the extractors.
        this.player.extractors.loadDefault(this.options?.extractorsLoadFilter)
        .then(() => Logger.info("Extractors loaded successfully!"))
        .catch((e) => Logger.error("Unable to load the extractors; with reason: " + e))
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

    /**
     * Check whether given events list has invalid events.
     * @returns {boolean}
     */
    #hasInvalidEvents() {
        return this.options && this.options.events && this.options.events.some(this.#invalidEventPredicate)
    }

    /**
     * Event check predicate.
     * @param event - The event name.
     * @returns {boolean}
     */
    #invalidEventPredicate(event: GuildQueueEvent) {
        return event === GuildQueueEvent.VoiceStateUpdate || event === GuildQueueEvent.WillAutoPlay || event === GuildQueueEvent.WillPlayTrack
    }
}