"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicEventHandler_1 = require("../classes/handlers/MusicEventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
const distube_1 = require("distube");
exports.default = new MusicEventHandler_1.MusicEventHandler({
    name: distube_1.Events.NO_RELATED,
    description: "Executed when a manager is unable to find songs using the given query.",
    listener(queue, error) {
        const commands = this.getExtension(ForgeMusic_1.ForgeMusic).commands.get(distube_1.Events.NO_RELATED);
        if (!commands)
            return;
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: queue.textChannel,
                client: this,
                command,
                environment: {
                    queue,
                    error
                },
                data: command.compiled.code
            });
        }
    }
});
