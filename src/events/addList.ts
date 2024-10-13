import { AdditionalMeta, MusicEventHandler } from "@handlers/MusicEventHandler"
import { Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Events, type Playlist } from "distube"

export default new MusicEventHandler({
    name: Events.ADD_LIST,
    description: "Executed when a playlist is added to the queue.",
    listener(queue, playlist: Playlist<AdditionalMeta>) {
        const commands = this.getExtension(ForgeMusic).commands.get(Events.ADD_LIST)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.textChannel,
                client: this,
                command,
                environment: {
                    queue,
                    playlist
                },
                data: command.compiled.code
            })
        }
    }
})