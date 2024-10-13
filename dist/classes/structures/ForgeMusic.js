"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeMusic = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const MusicCommandManager_1 = require("../managers/MusicCommandManager");
const distube_1 = require("distube");
class ForgeMusic extends forgescript_1.ForgeExtension {
    constructor(distubeOptions, events) {
        super();
        this.distubeOptions = distubeOptions;
        this.events = events;
        this.name = "ForgeMusic";
        this.description = "A standard music library tailored for ForgeScript.";
        this.version = "1.0.0";
    }
    init(client) {
        this.commands = new MusicCommandManager_1.MusicCommandManager(client);
        this.distube = new distube_1.DisTube(client, this.distubeOptions);
        this.load(this.nativesLocation);
        if (this.events?.length) {
            forgescript_1.EventManager.load(MusicCommandManager_1.handlerName, this.eventsLocation);
            client.events.load(MusicCommandManager_1.handlerName, this.events);
        }
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
