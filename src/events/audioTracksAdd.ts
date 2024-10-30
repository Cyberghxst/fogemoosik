import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.AudioTracksAdd,
    description: "Executed when multiple audio track are added to the queue.",
    async listener(queue, tracks) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.AudioTracksAdd)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, tracks },
                data: command.compiled.code
            })
        }
    }
})