import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.PlayerSkip,
    description: "Executed when the audio player skips current track.",
    async listener(queue, track, reason, description) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.PlayerSkip)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.metadata.text,
                client: this,
                command,
                environment: { queue, track, reason, description },
                data: command.compiled.code
            })
        }
    }
})