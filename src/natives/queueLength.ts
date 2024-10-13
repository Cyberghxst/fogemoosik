import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$queueLength",
    description: "Returns the length of the music queue.",
    version: "1.0.0",
    unwrap: true,
    output: ArgType.Number,
    async execute(ctx) {
        const manager = getInstance(ctx.client)
        const queue = manager.getQueue(ctx.guild)
        
        return this.success(queue.songs.length)
    }
})