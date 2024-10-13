import { NativeFunction } from "@tryforge/forgescript"
import { AudioPlayerStatus } from "@discordjs/voice"
import getInstance from "@functions/getInstance"

export default new NativeFunction({
    name: "$pauseSong",
    description: "Pauses the song that is playing.",
    version: "1.0.0",
    unwrap: false,
    execute(ctx) {
        const manager = getInstance(ctx.client)
        if (!manager.voices.has(ctx.guild)) {
            return this.customError("This guild does not have a voice connection!")
        }

        const connection = manager.voices.get(ctx.guild)
        if (connection.audioPlayer.state.status !== AudioPlayerStatus.Paused) {
            connection.pause()
        }
        
        return this.success()
    }
})