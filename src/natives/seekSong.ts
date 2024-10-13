import { Arg, NativeFunction } from "@tryforge/forgescript"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$seekSong",
    description: "Seeks a song.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredTime("Time", "Seek time.")
    ],
    async execute(ctx, [time]) {
        const manager = getInstance(ctx.client)
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!")
        }

        const queue = manager.getQueue(ctx.guild)
        queue.seek(time)
        
        return this.success()
    }
})