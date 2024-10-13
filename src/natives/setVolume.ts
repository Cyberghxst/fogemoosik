import { Arg, NativeFunction } from "@tryforge/forgescript"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$setVolume",
    description: "Set the volume of the player.",
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredNumber("Amount", "Volume amount to be applied.")
    ],
    async execute(ctx, [amount]) {
        const manager = getInstance(ctx.client)
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!")
        }

        const connection = manager.voices.get(ctx.guild)
        connection.volume = amount
        
        return this.success()
    }
})