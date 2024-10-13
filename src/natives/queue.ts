import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { createContext, runInContext } from "node:vm"
import getInstance from "@functions/getInstance"

/**
 * Capture pattern for song placeholders.
 */
export const PLACEHOLDER_PATTERN = /\{[a-zA-Z0-9._]+(?:\.[a-zA-Z0-9._]+)*\}/g

export default new NativeFunction({
    name: "$queue",
    description: "Returns queue songs resolving the given text placeholders.",
    version: "1.0.0",
    brackets: false,
    unwrap: true,
    args: [
        Arg.optionalNumber("Start Index", "The queue song start index."),
        Arg.optionalNumber("Limit", "The amount of queue songs to be retrieved."),
        Arg.optionalString("Text", "The text to be resolved."),
        Arg.optionalString("Separator", "The separator for each result.")

    ],
    output: ArgType.String,
    async execute(ctx, [index, limit, text, separator]) {
        const manager = getInstance(ctx.client)
        const queue = manager.getQueue(ctx.guild)

        text ||= "{position} {song.name} | <@{song.user.id}>"

        const results = queue.songs.slice(index ?? 0, limit ?? 10)
        .map((_, i) => text.replace(/\{position\}/g, String(i + 1)))
        .map((song, i) => {
            const matches = song.match(PLACEHOLDER_PATTERN) ?? []
            const context = createContext({ song: queue.songs[i] })

            for (const match of matches) {
                const placeholderValue = match.slice(1, -1)
                const result = runInContext(placeholderValue, context)
                song = song.replace(new RegExp(match, "g"), result)
            }

            return song
        })
        
        return this.success(results.join(separator || ","))
    }
})