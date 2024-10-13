"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_PATTERN = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const node_vm_1 = require("node:vm");
const getInstance_1 = __importDefault(require("../functions/getInstance"));
/**
 * Capture pattern for song placeholders.
 */
exports.PLACEHOLDER_PATTERN = /\{[a-zA-Z0-9._]+(?:\.[a-zA-Z0-9._]+)*\}/g;
exports.default = new forgescript_1.NativeFunction({
    name: "$queue",
    description: "Returns queue songs resolving the given text placeholders.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.optionalNumber("Start Index", "The queue song start index."),
        forgescript_1.Arg.optionalNumber("Limit", "The amount of queue songs to be retrieved."),
        forgescript_1.Arg.optionalString("Text", "The text to be resolved."),
        forgescript_1.Arg.optionalString("Separator", "The separator for each result.")
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [index, limit, text, separator]) {
        const manager = (0, getInstance_1.default)(ctx.client);
        const queue = manager.getQueue(ctx.guild);
        text || (text = "{position} {song.name} | <@{song.user.id}>");
        const results = queue.songs.slice(index ?? 0, limit ?? 10)
            .map((_, i) => text.replace(/\{position\}/g, String(i + 1)))
            .map((song, i) => {
            const matches = song.match(exports.PLACEHOLDER_PATTERN) ?? [];
            const context = (0, node_vm_1.createContext)({ song: queue.songs[i] });
            for (const match of matches) {
                const placeholderValue = match.slice(1, -1);
                const result = (0, node_vm_1.runInContext)(placeholderValue, context);
                song = song.replace(new RegExp(match, "g"), result);
            }
            return song;
        });
        return this.success(results.join(separator || ","));
    }
});
