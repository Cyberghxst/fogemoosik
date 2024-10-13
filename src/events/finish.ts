import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Events } from "distube"

export default new MusicEventHandler({
    name: Events.FINISH,
    description: "Executed when a queue finishes playing.",
    listener(queue) {
        const commands = this.getExtension(ForgeMusic).commands.get(Events.FINISH)
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