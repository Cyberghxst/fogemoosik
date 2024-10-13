import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$getVolume",
    description: "Get the volume of the player.",
    version: "1.0.0",
    unwrap: true,
    output: ArgType.Number,
    async execute(ctx) {
        const manager = getInstance(ctx.client)
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!")
        }

        const connection = manager.voices.get(ctx.guild)
        
        return this.success(connection.volume)
    }
})