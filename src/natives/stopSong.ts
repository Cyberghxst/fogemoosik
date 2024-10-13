import { NativeFunction } from "@tryforge/forgescript"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$stopSong",
    description: "Stops the song that is playing.",
    version: "1.0.0",
    unwrap: false,
    execute(ctx) {
        const manager = getInstance(ctx.client)
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!")
        }

        const connection = manager.voices.get(ctx.guild)
        connection.stop(true)
        
        return this.success()
    }
})