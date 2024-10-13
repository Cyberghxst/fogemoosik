import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

export default new MusicEventHandler({
    name: GuildQueueEvent.ChannelPopulate,
    description: "Executed when a voice channel is populated.",
    async listener(queue) {
        const commands = this.getExtension(ForgeMusic).commands.get(GuildQueueEvent.ChannelPopulate)
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