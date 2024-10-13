import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.PlayerError,
    description: "Executed when the audio player errors while streaming audio track.",
    async listener(queue, error, track) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.PlayerError)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: { queue, error, track },
                data: command.compiled.code
            })
        }
    }
})