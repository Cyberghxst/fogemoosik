import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$isPaused",
    description: "Check whether current queue is paused.",
    version: "1.0.0",
    unwrap: true,
    output: ArgType.Boolean,
    async execute(ctx) {
        const manager = getInstance(ctx.client)
        
        return this.success(manager.getQueue(ctx.guild).paused)
    }
})