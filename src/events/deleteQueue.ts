import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Events } from "distube"

export default new MusicEventHandler({
    name: Events.DELETE_QUEUE,
    description: "Executed when a queue is deleted.",
    listener(queue) {
        const commands = this.getExtension(ForgeMusic).commands.get(Events.DELETE_QUEUE)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.textChannel,
                client: this,
                command,
                environment: {
                    queue
                },
                data: command.compiled.code
            })
        }
    }
})