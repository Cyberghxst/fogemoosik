"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const getInstance_1 = __importDefault(require("../functions/getInstance"));
exports.default = new forgescript_1.NativeFunction({
    name: "$audioPlayerStatus",
    description: "Get the status of the audio player.",
    version: "1.0.0",
    unwrap: true,
    output: forgescript_1.ArgType.String,
    async execute(ctx) {
        const manager = (0, getInstance_1.default)(ctx.client);
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!");
        }
        const connection = manager.voices.get(ctx.guild);
        return this.success(connection.audioPlayer.state.status);
    }
});
