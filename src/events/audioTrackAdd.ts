import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.AudioTrackAdd,
    description: "Executed when audio track is added to the queue.",
    async listener(queue, track) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.AudioTrackAdd)
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