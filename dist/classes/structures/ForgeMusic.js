"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ForgeMusic_instances, _ForgeMusic_hasInvalidEvents, _ForgeMusic_invalidEventPredicate;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeMusic = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
const MusicCommandManager_1 = require("../managers/MusicCommandManager");
/**
 * The entrypoint of the forge music system.
 */
class ForgeMusic extends forgescript_1.ForgeExtension {
    /**
     * Creates an instance of the music extension.
     * @returns {ForgeMusic}
     */
    constructor(options) {
        super();
        _ForgeMusic_instances.add(this);
        this.options = options;
        /** Cock my beloved. <3 */
        this.name = "ForgeMusic";
        this.description = "A standard music library tailored for ForgeScript.";
        this.version = "1.0.0";
        /**
         * The required intents for this extension to work.
         */
        this.requiredIntents = ["GuildVoiceStates"];
        if (__classPrivateFieldGet(this, _ForgeMusic_instances, "m", _ForgeMusic_hasInvalidEvents).call(this)) {
            forgescript_1.Logger.error("ForgeMusic found that you are using some of the following events:\n- VoiceStateUpdate\n- WillAutoPlay\n- WillPlayTrack\nthat aren't supported.");
        }
    }
    /**
     * Starts the music extension.
     * @param client - The discord client instance.
     * @returns {void}
     */
    init(client) {
        // Checking if client has the required intents.
        if (!client.options.intents.has(this.requiredIntents[0])) {
            forgescript_1.Logger.warn(`${this.name} requires the following intents to work: \"${this.requiredIntents[0]}\"`);
        }
        // Create a main player instance.
        this.player = new discord_player_1.Player(client, this.options);
        // Create the command manager.
        this.commands = new MusicCommandManager_1.MusicCommandManager(client);
        // Load the native functions.
        this.load(this.nativesLocation);
        // Load the events if available.
        if (this.options?.events?.length) {
            forgescript_1.EventManager.load(MusicCommandManager_1.handlerName, this.eventsLocation);
            client.events.load(MusicCommandManager_1.handlerName, this.options.events);
        }
        // Loading the extractors.
        this.player.extractors.loadDefault(this.options?.extractorsLoadFilter)
            .then(() => forgescript_1.Logger.info("Extractors loaded successfully!"))
            .catch((e) => forgescript_1.Logger.error("Unable to load the extractors; with reason: " + e));
    }
    /**
     * Returns the events location.
     */
    get eventsLocation() {
        return __dirname.replace(/classes\\structures/, "events");
    }
    /**
     * Returns the native functions location.
     */
    get nativesLocation() {
        return __dirname.replace(/classes\\structures/, "natives");
    }
}
exports.ForgeMusic = ForgeMusic;
_ForgeMusic_instances = new WeakSet(), _ForgeMusic_hasInvalidEvents = function _ForgeMusic_hasInvalidEvents() {
    return this.options && this.options.events && this.options.events.some(__classPrivateFieldGet(this, _ForgeMusic_instances, "m", _ForgeMusic_invalidEventPredicate));
}, _ForgeMusic_invalidEventPredicate = function _ForgeMusic_invalidEventPredicate(event) {
    return event === discord_player_1.GuildQueueEvent.VoiceStateUpdate || event === discord_player_1.GuildQueueEvent.WillAutoPlay || event === discord_player_1.GuildQueueEvent.WillPlayTrack;
};
