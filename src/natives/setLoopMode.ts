import { QueueRepeatMode, useMainPlayer } from "discord-player"
import { Arg, NativeFunction } from "@tryforge/forgescript"

export default new NativeFunction({
    name: "$setLoopMode",
    version: "1.0.0",
    description: "Set the loop mode of the music player.",
    brackets: true,
    unwrap: true,
    args: [Arg.requiredEnum(QueueRepeatMode, "Mode", "The loop mode of the music player.")],
    execute(ctx, [mode]) {
        const player = useMainPlayer()

        player.queues.get(ctx.guild).setRepeatMode(mode)

        return this.success()
    }
})