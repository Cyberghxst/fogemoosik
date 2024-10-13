"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const getInstance_1 = __importDefault(require("../functions/getInstance"));
exports.default = new forgescript_1.NativeFunction({
    name: "$voiceConnect",
    description: "Creates a voice connection between the client and a voice channel.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Channel ID",
            description: "The voice channel ID to create the connection with.",
            type: forgescript_1.ArgType.Channel,
            required: true,
            rest: false,
            check: (c) => c.isVoiceBased()
        },
        forgescript_1.Arg.optionalBoolean("Deaf", "Whether deaf the client when it joins the voice channel."),
        forgescript_1.Arg.optionalBoolean("Mute", "Whether mute the client when it joins the voice channel.")
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [voiceChannel, deaf, mute]) {
        const manager = (0, getInstance_1.default)(ctx.client);
        const voice = manager.voices.create(voiceChannel);
        voice.voiceState.setDeaf(deaf);
        voice.voiceState.setMute(mute);
        await voice.join(voiceChannel);
        return this.success(manager.voices.has(ctx.guild));
    }
});
