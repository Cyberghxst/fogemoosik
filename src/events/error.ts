import { AdditionalMeta, MusicEventHandler } from "@handlers/MusicEventHandler"
import { Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Events, type Song } from "distube"

export default new MusicEventHandler({
    name: Events.ERROR,
    description: "Executed when a queue throws an error.",
    listener(error, queue, song: Song<AdditionalMeta>) {
        const commands = this.getExtension(ForgeMusic).commands.get(Events.ERROR)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.textChannel,
                client: this,
                command,
                environment: {
                    error,
                    queue,
                    song
                },
                data: command.compiled.code
            })
        }
    }
})