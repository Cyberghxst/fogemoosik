"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$playTrack",
    version: "1.0.0",
    description: "Play a track by query.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Channel ID",
            description: "Voice channel ID to play the track on.",
            type: forgescript_1.ArgType.Channel,
            required: true,
            rest: false,
            check: (c) => c.isVoiceBased()
        },
        forgescript_1.Arg.requiredString("Query", "Track name to be searched.")
    ],
    async execute(ctx, [voiceChannel, query]) {
        const player = (0, discord_player_1.useMainPlayer)();
        let executed = true;
        const result = await player.play(voiceChannel, query, {
            nodeOptions: {
                metadata: { text: ctx.channel }
            }
        }).catch((e) => {
            executed = false;
            return e;
        });
        return executed ? this.success() : this.error(result);
    }
});
