import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.PlayerStart,
    description: "Executed when the audio player starts streaming audio track.",
    async listener(queue, track) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.PlayerStart)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: { queue, track },
                data: command.compiled.code
            })
        }
    }
})