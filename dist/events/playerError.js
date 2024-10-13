"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicEventHandler_1 = require("../classes/handlers/MusicEventHandler");
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new MusicEventHandler_1.MusicEventHandler({
    name: discord_player_1.GuildQueueEvent.PlayerError,
    description: "Executed when the audio player errors while streaming audio track.",
    async listener(queue, error, track) {
        const commands = this.getExtension(ForgeMusic_1.ForgeMusic).commands.get(discord_player_1.GuildQueueEvent.PlayerError);
        if (!commands)
            return;
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: { queue, error, track },
                data: command.compiled.code
            });
        }
    }
});