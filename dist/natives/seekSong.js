"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const getInstance_1 = __importDefault(require("../functions/getInstance"));
exports.default = new forgescript_1.NativeFunction({
    name: "$seekSong",
    description: "Seeks a song.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredTime("Time", "Seek time.")
    ],
    async execute(ctx, [time]) {
        const manager = (0, getInstance_1.default)(ctx.client);
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!");
        }
        const queue = manager.getQueue(ctx.guild);
        queue.seek(time);
        return this.success();
    }
});
