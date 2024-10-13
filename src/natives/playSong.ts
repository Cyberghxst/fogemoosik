import { Arg, NativeFunction } from "@tryforge/forgescript"
import { GuildTextBasedChannel } from "discord.js"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$playSong",
    description: "Plays a song in a voice channel.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredString("Query", "Query to search the song with.")
    ],
    async execute(ctx, [query]) {
        const manager = getInstance(ctx.client)
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!")
        }

        const connection = manager.voices.get(ctx.guild)
        await manager.play(connection.channel, query, {
            member: ctx.member,
            textChannel: ctx.channel as GuildTextBasedChannel
        })
        
        return this.success()
    }
})