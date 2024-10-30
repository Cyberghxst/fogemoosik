import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.EmptyChannel,
    description: "Executed when the voice channel is empty.",
    async listener(queue) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.EmptyChannel)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue },
                data: command.compiled.code
            })
        }
    }
})