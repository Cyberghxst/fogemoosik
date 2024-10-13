import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.EmptyQueue,
    description: "Executed when the queue is empty.",
    async listener(queue) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.EmptyQueue)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: { queue },
                data: command.compiled.code
            })
        }
    }
})