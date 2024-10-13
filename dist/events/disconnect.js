"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicEventHandler_1 = require("../classes/handlers/MusicEventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
const distube_1 = require("distube");
exports.default = new MusicEventHandler_1.MusicEventHandler({
    name: distube_1.Events.DISCONNECT,
    description: "Executed when a queue is disconnected.",
    listener(queue) {
        const commands = this.getExtension(ForgeMusic_1.ForgeMusic).commands.get(distube_1.Events.DISCONNECT);
        if (!commands)
            return;
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: queue.textChannel,
                client: this,
                command,
                environment: {
                    queue
                },
                data: command.compiled.code
            });
        }
    }
});
