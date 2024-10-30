import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.Disconnect,
    description: "Executed when the bot is disconnected from the channel.",
    async listener(queue) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.Disconnect)
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