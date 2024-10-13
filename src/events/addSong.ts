import { AdditionalMeta, MusicEventHandler } from "@handlers/MusicEventHandler"
import { Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Events, type Song } from "distube"

export default new MusicEventHandler({
    name: Events.ADD_SONG,
    description: "Executed when a song is added to the queue.",
    listener(queue, song: Song<AdditionalMeta>) {
        const commands = this.getExtension(ForgeMusic).commands.get(Events.ADD_SONG)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.textChannel,
                client: this,
                command,
                environment: {
                    queue,
                    song
                },
                data: command.compiled.code
            })
        }
    }
})