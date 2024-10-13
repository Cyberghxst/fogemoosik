import { MusicEventHandler } from "@handlers/MusicEventHandler"
import { Interpreter } from "@tryforge/forgescript"
import { ForgeMusic } from "@structures/ForgeMusic"
import { Events } from "distube"

export default new MusicEventHandler({
    name: Events.DEBUG,
    description: "Music manager debugs.",
    listener(text) {
        const commands = this.getExtension(ForgeMusic).commands.get(Events.DEBUG)
        if (!commands) return;

        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: {
                    debug: text
                },
                data: command.compiled.code
            })
        }
    }
})