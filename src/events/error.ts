import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.Error,
    description: "Executed when the queue encounters error.",
    async listener(queue, error) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.Error)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, error },
                data: command.compiled.code
            })
        }
    }
})