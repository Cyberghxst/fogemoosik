"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicEventHandler = void 0;
const ForgeMusic_1 = require("../structures/ForgeMusic");
const forgescript_1 = require("@tryforge/forgescript");
/**
 * The generic music event handler.
 */
class MusicEventHandler extends forgescript_1.BaseEventHandler {
    /**
     * Register this event.
     * @param client - ForgeClient instance.
     */
    register(client) {
        client.getExtension(ForgeMusic_1.ForgeMusic).distube.on(this.name, this.listener.bind(client));
    }
}
exports.MusicEventHandler = MusicEventHandler;
