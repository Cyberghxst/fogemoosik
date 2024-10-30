import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.PlayerFinish,
    description: "Executed when the audio player finishes streaming audio track.",
    async listener(queue, track) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.PlayerFinish)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, track },
                data: command.compiled.code
            })
        }
    }
})