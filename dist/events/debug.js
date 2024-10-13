"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicEventHandler_1 = require("../classes/handlers/MusicEventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
const distube_1 = require("distube");
exports.default = new MusicEventHandler_1.MusicEventHandler({
    name: distube_1.Events.DEBUG,
    description: "Music manager debugs.",
    listener(text) {
        const commands = this.getExtension(ForgeMusic_1.ForgeMusic).commands.get(distube_1.Events.DEBUG);
        if (!commands)
            return;
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                environment: {
                    debug: text
                },
                data: command.compiled.code
            });
        }
    }
});
