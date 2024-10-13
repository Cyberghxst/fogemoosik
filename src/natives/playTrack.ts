import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { BaseChannel, VoiceBasedChannel } from "discord.js"
import { useMainPlayer } from "discord-player"

export default new NativeFunction({
    name: "$playTrack",
    version: "1.0.0",
    description: "Play a track by query.",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "Channel ID",
            description: "Voice channel ID to play the track on.",
            type: ArgType.Channel,
            required: true,
            rest: false,
            check: (c: BaseChannel) => c.isVoiceBased()
        },
        Arg.requiredString("Query", "Track name to be searched.")
    ],
    async execute(ctx, [voiceChannel, query]) {
        const player = useMainPlayer()

        let executed = true
        const result = await player.play(<VoiceBasedChannel>voiceChannel, query, {
            nodeOptions: {
                metadata: { text: ctx.channel }
            }
        }).catch((e) => {
            executed = false
            return e
        })

        return executed ? this.success() : this.error(result)
    }
})