import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.PlayerTrigger,
    description: "Executed when the audio player is triggered.",
    async listener(queue, track, reason) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.PlayerTrigger)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: { queue, track, reason },
                data: command.compiled.code
            })
        }
    }
})