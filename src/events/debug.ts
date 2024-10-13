import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.Debug,
    description: "Executed when the queue sends a debug info.",
    async listener(queue, message) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.Debug)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: { queue, message },
                data: command.compiled.code
            })
        }
    }
})