import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Interpreter } from "@tryforge/forgescript"
import { GuildQueueEvent } from "discord-player"

/**
 * The event should be listen to.
 */
const eventName = GuildQueueEvent.VolumeChange

export default new MusicEventHandler({
    name: eventName,
    description: "Executed when audio player's volume is changed.",
    async listener(queue, oldVolume, newVolume) {
        const commands = this.getExtension(ForgeMusic).commands.get(eventName)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: { queue, oldVolume, newVolume },
                data: command.compiled.code
            })
        }
    }
})