import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Events } from "distube"

export default new MusicEventHandler({
    name: Events.NO_RELATED,
    description: "Executed when a manager is unable to find songs using the given query.",
    listener(queue, error) {
        const commands = this.getExtension(ForgeMusic).commands.get(Events.NO_RELATED)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: queue.textChannel,
                client: this,
                command,
                environment: {
                    queue,
                    error
                },
                data: command.compiled.code
            })
        }
    }
})